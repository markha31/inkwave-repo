<template>
  <div>
    <Header />
    <main>

      <div class="present">
        <p>
          Publiez vos œuvres et explorer les œuvres des artistes du monde entier
          sur InkWave.
        </p>
        <p>Créer votre profil d’artiste pour mettre en valeur vos œuvres !</p>
      </div>

    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

import "../assets/main.css";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
.present {
  text-align: justify;
  color: white;
  font-size: large;
  padding: 0 35%;
  margin-top: 10vh;
  margin-bottom: 20vh;
}
</style>
