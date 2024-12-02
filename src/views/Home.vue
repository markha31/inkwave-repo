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
    <div class="homepage-album">
      <h2>Nouveautés !</h2>
      <div v-if="homepageImages.length">
        <div v-for="image in homepageImages" :key="image" class="album-image">
          <img :src="image" alt="User uploaded image" />
        </div>
      </div>
      <div v-else>
        <p>Aucune image disponible pour le moment.</p>
      </div>
    </div>
    <Footer />
  </div>
</template>


<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { ref as dbRef, get } from "firebase/database";
import { database } from '../firebase';

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      homepageImages: [],
    };
  },
  created() {
    this.fetchHomepageImages();
  },
  methods: {
    async fetchHomepageImages() {
      try {
        const allImagesRef = dbRef(database, 'allImages');
        const snapshot = await get(allImagesRef);
        if (snapshot.exists()) {
          this.homepageImages = snapshot.val() || [];
        }
      } catch (error) {
        console.error("Error fetching homepage images:", error.message);
      }
    }
  }
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

.homepage-album {
  text-align: center;
  color: white;
  margin-top: 20px;
}

.album-image {
  display: inline-block;
  margin: 10px;
}

.album-image img {
  max-width: 200px;
  height: auto;
  display: block;
}
</style>
