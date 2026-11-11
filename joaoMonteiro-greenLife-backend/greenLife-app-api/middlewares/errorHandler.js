const fs = require('fs');
const { error } = require('./apiResponse');

/**
 * Coleta todos os arquivos que o Multer gravou nesta requisição
 * (upload.single -> req.file, upload.fields/array -> req.files).
 */
function collectUploadedFiles(req) {
    const files = [];
    if (req.file) files.push(req.file);
    if (Array.isArray(req.files)) {
        files.push(...req.files);
    } else if (req.files && typeof req.files === 'object') {
        Object.values(req.files).forEach((list) => files.push(...list));
    }
    return files;
}

/**
 * Se a requisição falhou depois que o Multer já gravou o arquivo no disco
 * (403 de quem não é dono, 400 do validador, 404, 500...), esse arquivo
 * ficaria órfão: está na pasta, mas nenhum registro do banco aponta para ele.
 * Aqui ele é apagado antes de responder o erro.
 */
async function cleanupOrphanFiles(req) {
    const files = collectUploadedFiles(req);
    await Promise.all(files.map(async (file) => {
        if (!file.path) return;
        try {
            await fs.promises.unlink(file.path);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.error('Erro ao apagar arquivo órfão:', file.path, err);
            }
        }
    }));
}

module.exports = async (err, req, res, next) => {
    await cleanupOrphanFiles(req);

    const statusCode = err.status || 500;
    if (statusCode >= 500) console.error(err);
    const errors = err.errors || [];
    return error(res, err.message || 'Ocorreu um erro inesperado.', statusCode, errors);
};
