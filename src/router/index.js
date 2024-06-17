import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SignUp from '../views/SignUp.vue';
import SignIn from '../views/SignIn.vue';
import Dessins from '../views/Dessins.vue';
import ArtNumerique from '../views/ArtNumerique.vue';
import Peintures from '../views/Peintures.vue';
import Contact from '../views/Contact.vue';
import UserPage from '../views/UserPage.vue';
import Apropos from '../views/Apropos.vue';
import Copyright from '../views/Copyright.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUp', 
    component: SignUp
  },
  {
    path: '/signin',
    name: 'SignIn', 
    component: SignIn
  },
  {
    path: '/dessins',
    name: 'Dessins', 
    component: Dessins
  },
  {
    path: '/artnumerique',
    name: 'ArtNumerique', 
    component: ArtNumerique
  },
  {
    path: '/peintures',
    name: 'Peintures',
    component: Peintures
  },
  {
    path: '/contact',
    name: 'Contact', 
    component: Contact
  },
  {
    path: '/userpage',
    name: 'UserPage', 
    component: UserPage
  },
  {
    path: '/apropos',
    name: 'Apropos', 
    component: Apropos
  },
  {
    path: '/copyright',
    name: 'Copyright', 
    component: Copyright
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

