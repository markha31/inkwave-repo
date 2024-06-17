<template>
  <div class="user-page">
    <Header />

    <div class="centered-container">
      <h2>Mon Album</h2>

      <div v-if="userType === 'artiste'">
        <div class="upload-section">
          <input type="file" @change="handleFileUpload" />
          <button class="uploadImage" @click="uploadImage">Publier</button>
        </div>
      </div>
      <div v-else>
        <p>Seuls les artistes peuvent télécharger des images et avoir un album.</p>
      </div>

      <div class="album">
        <h3>Album</h3>
        <div v-if="albumImages.length">
          <div v-for="image in albumImages" :key="image" class="album-image">
            <img :src="image" alt="User uploaded image" />
          </div>
        </div>
        <div v-else>
          <p>Aucune image dans l'album.</p>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { auth, database, storage } from '../firebase';
import { ref as dbRef, get, set, child, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "UserPage",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      userId: null,
      userType: "",
      albumImages: [],
      selectedFile: null,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userId = user.uid;
        this.fetchUserData();
        this.fetchAlbumImages();
      }
    });
  },
  methods: {
    async fetchUserData() {
      try {
        console.log ('test');
        const userRef = dbRef(database, `users/${this.userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          this.userType = data.userTypes;
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      console.log ('test 2');

    },
    async uploadImage() {
      if (!this.selectedFile || !this.userId) return;

      console.log ('test 3');

      try {

        console.log ('test 4');

        const imageRef = storageRef(storage, `albums/${this.userId}/${this.selectedFile.name}`);
        await uploadBytes(imageRef, this.selectedFile);
        const imageUrl = await getDownloadURL(imageRef);

        await this.addImageToAlbum(imageUrl);
        console.log ('test 5');

        this.albumImages.push(imageUrl);
        this.selectedFile = null;
      } catch (error) {
        console.error("Error uploading image:", error.message);
      }
    },
    async addImageToAlbum(imageUrl) {
      try {
        const userAlbumRef = dbRef(database, `albums/${this.userId}`);
        const snapshot = await get(userAlbumRef);
        let albumImages = [];

        if (snapshot.exists()) {
          albumImages = snapshot.val().albumImages || [];
        }

        albumImages.push(imageUrl);
        await set(userAlbumRef, { albumImages });
      } catch (error) {
        console.error("Error adding image to album:", error.message);
      }
    },
    async fetchAlbumImages() {
      try {
        const userAlbumRef = dbRef(database, `albums/${this.userId}`);
        const snapshot = await get(userAlbumRef);

        if (snapshot.exists()) {
          this.albumImages = snapshot.val().albumImages || [];
        }
      } catch (error) {
        console.error("Error fetching album images:", error.message);
      }
    },
  },
};
</script>

<style scoped>
.user-page {
  width: 100%;
}

.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.upload-section {
  margin-bottom: 20px;
}

.album {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.album-image {
  margin: 10px;
}

.album-image img {
  max-width: 200px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.uploadImage {
  width: 70px;
  background: #63264a;
  border-radius: 5px;
  color: white;
  border: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 15px;
}

.uploadImage:hover {
  background: #3d0b37;
}

</style>
