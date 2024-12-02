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
        <p>
        General support : blabla@gmail.fr
        Feedback : blibli@gmail.fr
        </p>
        <p>
        N'hésitez pas à nous contacter !
      </p>
      </p>
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
  padding: 0 35%;
  margin-top: 10vh;
  margin-bottom: 20vh;
}

</style>
