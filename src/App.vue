<template>
  <nav class="navbar-expand-lg navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <a>FreshPay Reconciliation App</a>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link active">
              <a aria-current="page">Home</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mt-5">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
