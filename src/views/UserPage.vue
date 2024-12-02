<template>
  <div class="user-page">
    <Header />

    <div class="centered-container">
      <div class="user-profile">
        <h2>Mon profil</h2>
        <div class="user-info"> 
          <p>@{{ username }}</p> 
          <p>Type : {{ userType }}</p>
          <p>Email : {{ email }}</p>
        </div>
      </div>

      <h3>Remplir l'album</h3>
      <div v-if="userType === 'artiste'">
        <div class="uploadSection">
          <input type="file" @change="handleFileUpload " class="file-input"/>
          <button class="uploadImage" @click="uploadImage">Publier</button>
        </div>
      </div>
      <div v-else>
        <p>Seuls les artistes peuvent  publier des images et avoir un album.</p>
      </div>

      <div class="album">
        <h2>Mon Album</h2>
        <div v-if="albumImages.length">
          <div v-for="(image, index) in albumImages" :key="image" class="album-image">
            <img :src="image" alt="User uploaded image" />
            <button class="delete-button" @click="deleteImage(index, image)">Supprimer</button>
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
import { ref as dbRef, get, set, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
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
      albumImages: [],
      selectedFile: null,
      email: "",
      username: "",
      userType: ""
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
        const userRef = dbRef(database, `users/${this.userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          this.email = data.email;
          this.username = data.username;
          this.userType = data.userTypes;
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadImage() {
      if (!this.selectedFile || !this.userId) return;
      try {
        const imageRef = storageRef(storage, `albums/${this.userId}/${this.selectedFile.name}`);
        await uploadBytes(imageRef, this.selectedFile);
        const imageUrl = await getDownloadURL(imageRef);

        await this.addImageToAlbum(imageUrl);
        await this.addImageToAllImages(imageUrl);

        this.albumImages.push(imageUrl);
        this.selectedFile = null;
      } catch (error) {
        console.error("Error uploading image:", error.message);
      }
    },
    async addImageToAllImages(imageUrl) {
      try {
        const allImagesRef = dbRef(database, `allImages`);
        const snapshot = await get(allImagesRef);
        let allImages = [];
        if (snapshot.exists()) {
          allImages = snapshot.val() || [];
        }
        allImages.push(imageUrl);
        await set(allImagesRef, allImages);
      } catch (error) {
        console.error("Error adding image to all images:", error.message);
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
    async deleteImage(index, imageUrl) {
  try {
    const fileName = decodeURIComponent(imageUrl.split('%2F').pop().split('?')[0]);

    // Remove from Firebase Storage
    const imageRef = storageRef(storage, `albums/${this.userId}/${fileName}`);
    await deleteObject(imageRef);

    // Remove from user album in Realtime Database
    this.albumImages.splice(index, 1);
    const userAlbumRef = dbRef(database, `albums/${this.userId}`);
    await set(userAlbumRef, { albumImages: this.albumImages });

    // Remove from global `allImages` node in Realtime Database
    const allImagesRef = dbRef(database, `allImages`);
    const snapshot = await get(allImagesRef);

    if (snapshot.exists()) {
      const allImages = snapshot.val() || [];
      const updatedImages = allImages.filter((url) => url !== imageUrl);
      await set(allImagesRef, updatedImages);
    }

    console.log("Image deleted successfully from user album and homepage.");
  } catch (error) {
    console.error("Error deleting image:", error.message);
  }
}

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

  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  margin-bottom: 20px;
  margin-top: 10px;
  background: #ffffff url(../assets/back.jpg) center center/cover no-repeat;
  width: 100%;
}

.uploadSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3f9d2;
  padding: 30px;
  border-radius: 5px;
  max-width: 300px;
  color: #3d0b37;

  button {
    margin-top: 15px;
  }
}

.file-input {
  margin-bottom: 7px;
  padding: 9px 9px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.album {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.album-image {
  margin-bottom: 50px;
  padding: 10px 10px;
  border: 2px solid rgb(83, 83, 83);
}

.album-image img {
  max-width: 200px;
  display: block;
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

h2 {
  color: #cbeaa6;
}

h3 {
  color: #cbeaa6;
}

.delete-button {
  width: 85px;
  background: #63264a;
  border-radius: 5px;
  color: white;
  border: 0;
  margin-top: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 14px;
}

.delete-button:hover {
  background: #3d0b37;
}

.user-info {
  margin-bottom: 20px;
}

.user-info p {
  margin: 10px 0;
}
</style>
