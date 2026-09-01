<template>
  <nav class="navbar">
    <h1>greenLife</h1>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar { background: #eee; padding: 1rem; display: flex; justify-content: space-between; }
ul { display: flex; list-style: none; gap: 1rem; }
</style>
