<template>
  <div>
    <Header />
    <main>
      <div class="co">
        <H1>CONTACT INKWAVE</H1>
        <br>
      <p>
        Nous aimerions avoir de vos nouvelles concernant InkWave. 
        Veuillez envoyer votre demande par e-mail.
        <p class="mails">
        General support : markha.d@outlook.fr
        <br>
        Feedback : markha.djlv@outlook.com
        </p>
        <p>
        N'hésitez pas à nous contacter !
      </p>
      </p>

      <img class="co-img" src="../assets/contact.jpg" alt="contact">

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
  name: "Contact",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>



.co {
  text-align: justify;
  color: white;
  font-size: large;
  padding: 0 20%;
  margin-top: 10vh;
  margin-bottom: 0vh;
}

.mails {
  font-weight: bold;
  font-size: 1.3rem;
}

.co-img {
  margin-top: 100px;
  height: 300px;
  width: 300px;
}
</style>
