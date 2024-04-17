<template>
    <header>
    <div class="container">

    <router-link to="/" class="logo">
    <img src="../assets/logowave.png" alt="Logo"/>
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

    <router-link to="/signin" class="signin">
                <img src="../assets/signinlogo.png" alt="Sign In">  
    </router-link>   

    <router-link to="/signup" class="signup">
                <img src="../assets/signuplogo.png" alt="Sign Up">
    </router-link>   

    </div>
    </header>
</template>


<script>
export default {
    name: 'Header'
}
</script>


<style scoped>

header {
    color: #fff;
    background-color: rgb(21, 21, 21);
}

.container {
    display: flex;
	margin: auto;
	padding:25px;
}

.logo img{
    height: 50px;
}

nav ul {
    list-style: none;
    display: flex;
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

.signup img{
    height: 25px;
}

.signin img{
    height: 25px;
}


</style>