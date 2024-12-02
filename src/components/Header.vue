<template>

  <header>
    <div class="container">
      <router-link to="/" class="logo">
        <img src="../assets/logowave.png" alt="Logo" />
      </router-link>

      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/dessins">Dessins</router-link></li>
          <li><router-link to="/artnumerique">Art numérique</router-link></li>
          <li><router-link to="/peintures">Peintures</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </nav>

      <nav>
          <div v-if="isLoggedIn" class="auth-links">
            <router-link class="userp" to="/userpage">Profil</router-link>
            <button @click="signOut" class="signOut">Déconnexion</button>
          </div>
          <div class="auth-links" v-else>
        <router-link to="/signin" class="signin">Connexion</router-link>
        <router-link to="/signup" class="signup">Inscription</router-link>
      </div>
    </nav>
    
    </div>
  </header>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { auth } from '@/firebase';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

onMounted(() => {
  auth.onAuthStateChanged((user) => {
    isLoggedIn.value = !!user;
  });
});

const signOut = async () => {
  await auth.signOut();
  isLoggedIn.value = false;
  router.push('/');
};

</script>


<style scoped>
header {
  width: 100%;
  background-color: rgb(21, 21, 21);
  color: #fff;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 15px 25px;
  box-sizing: border-box;
}

.logo img {
  height: 50px;
  margin-right: 50px;
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
  color: #fff;
}

nav ul li a:hover {
  color: #cbeaa6;
}

.auth-links {
  display: flex;
  align-items: center;
}

.auth-links .signin,
.auth-links .signup,
.auth-links .userp,
.auth-links .signOut {
  margin-left: 20px;
  text-decoration: none;
  color: #fff;
  border: 1px solid #fff;
  padding: 5px 10px;
  border-radius: 3px;
  background: none;
  cursor: pointer;
  font-size: 15px;
}

.auth-links .signin:hover,
.auth-links .signup:hover,
.auth-links .userp:hover {
  background-color: #cbeaa6;
  color: #000;
}

.auth-links .signOut:hover {
  background-color: #932145;
}
</style>
