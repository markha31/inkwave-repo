<template>
    <footer>
      <div class="container">
        <router-link to="/" class="logo">
          <img src="../assets/logowave2.png" alt="Logo"/>
        </router-link>
  
        <nav>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
            <li><router-link to="/apropos">A propos</router-link></li>
            <li><router-link to="/copyright">Copyright</router-link></li>
          </ul>
        </nav>
  
        <div class="social-media">
          <a href="#" class="social-icon">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="social-icon">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="social-icon">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
  <style scoped>
  
  footer {
    width: 100%;
    background-color: #cbeaa6;
    color: black;
    padding: 20px 0;
    margin-top: 50vh;
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0 25px;
    box-sizing: border-box;
  }
  
  .logo img {
    height: 50px;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }
  
  nav ul li {
    margin-left: 20px;
  }
  
  nav ul li a {
    text-decoration: none;
    color: black;
  }
  
  .social-media {
    display: flex;
    gap: 10px;
  }
  
  .social-icon {
    color: #fff;
    font-size: 20px;
    transition: color 0.3s;
  }
  
  .social-icon:hover {
    color: #cbeaa6;
  }
  </style>
  