<template>
  <div class="full-width">
    <Header />

    <div class="centered-container">
      <form>
        <h2>Connexion</h2>

        <label for="username">Nom d'utilisateur :</label>
        <input type="text" id="username" v-model="formData.username">

        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="formData.password">
        <p v-if="erreurPwd" style="color: rgba(255, 0, 81, 0.772);">{{ erreurPwd }}</p>

        <button type="button" @click="submitForm">Valider</button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  name: 'SignIn',
  components: {
    Header
  },
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      erreurPwd: ''
    };
  },
  methods: {
    submitForm() {
      if (this.formData.password.length < 8) {
        this.erreurPwd = 'Le mot de passe doit contenir au moins 8 caractères.';
        return;
      }

      this.erreurPwd = '';

      // Logique de connexion ici (envoyer les données au serveur, etc.)
      console.log('Formulaire de connexion soumis avec succès :', this.formData);
    }
  }
};
</script>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

h2 {
  color: white;
  font-size: 24px;
  margin-bottom: 20px;
}

form {
  width: 30%;
  padding: 50px;
  border-radius: 10px;
  position: absolute;
  top: 20%;
  color: white;
}

input,
textarea {
  color: white;
  font-size: 15px;
  border-radius: 5px;
  background-color: transparent;
  border: 1.5px solid white;
  transition: border 0.3s;
  padding: 6px;
  margin-bottom: 20px;
  margin-top: 15px;
  width: 100%;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  border: 2px solid white;
}

button {
  width: 70px;
  background: #63264A;
  border-radius: 5px;
  color: white;
  border: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 15px;
}

button:hover {
  background: #3D0B37;
}

.input-group {
  display: flex;
  gap: 12px;
}

</style>
