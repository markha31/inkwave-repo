<template>
    <div>
      <Header />
      
      <main>
        <h1>Welcome to My App</h1>
        <p>This is a simple homepage for my Vue.js app.</p>
      </main>
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import "../assets/main.css";

  export default {
    components: {
      Header,
    }
  }
  </script>
  
  <style>
  
  </style>
  