/**
 * Teste da correção do trim() (Bloco 10.9).
 * O `curl -F "title=   "` apara os espaços sozinho, então aqui os campos são enviados
 * com espaços de verdade via fetch + FormData (Node 18+).
 *
 * Uso:
 *   TOKEN=<token do login> PRODUCT_ID=<id de um produto seu> IMAGE=<caminho de uma imagem> node scripts/test-trim.js
 */
const fs = require('fs');
const path = require('path');

const BASE = process.env.API_URL || 'http://localhost:3000/api';
const TOKEN = process.env.TOKEN;
const PRODUCT_ID = process.env.PRODUCT_ID;
const IMAGE = process.env.IMAGE;

if (!TOKEN || !PRODUCT_ID || !IMAGE) {
    console.error('Defina TOKEN, PRODUCT_ID e IMAGE. Ex.: TOKEN=... PRODUCT_ID=5 IMAGE=./foto.jpg node scripts/test-trim.js');
    process.exit(1);
}

function imageBlob() {
    return new Blob([fs.readFileSync(IMAGE)], { type: 'image/jpeg' });
}

async function show(label, method, url, body, headers = {}) {
    const res = await fetch(BASE + url, { method, body, headers });
    const json = await res.json().catch(() => ({}));
    console.log(`${label}\n  ${method} ${url} → HTTP ${res.status}  ${json.message || ''}\n`);
}

(async () => {
    const auth = { Authorization: `Bearer ${TOKEN}` };

    let fd = new FormData();
    fd.append('title', '     ');
    fd.append('description', 'título só com espaços');
    fd.append('image', imageBlob(), path.basename(IMAGE));
    await show('1) Upload com título só com espaços', 'POST', '/products/upload', fd, auth);

    fd = new FormData();
    fd.append('title', '     ');
    await show('2) Edição com título só com espaços', 'PUT', `/products/${PRODUCT_ID}`, fd, auth);

    await show('3) Comentário só com espaços', 'POST', `/products/${PRODUCT_ID}/comments`,
        JSON.stringify({ content: '   \n\t  ' }), { ...auth, 'Content-Type': 'application/json' });

    await show('4) Cadastro com nome completo só com espaços', 'POST', '/register',
        JSON.stringify({ username: 'teste_trim', email: 'trim@teste.com', password: '123456', confirmPassword: '123456', fullName: '    ' }),
        { 'Content-Type': 'application/json' });
})();
