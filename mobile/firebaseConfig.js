import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_RO4N8p8peu6aigkscgZk_8eRQeeoiO0",
  authDomain: "nlwcopamobile-392020.firebaseapp.com",
  projectId: "nlwcopamobile-392020",
  storageBucket: "nlwcopamobile-392020.appspot.com",
  messagingSenderId: "697334879439",
  appId: "1:697334879439:web:91903be6f68d67d497d3ba",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


//ios 697334879439-71om5iq9djv2sgd43rjh6fhamv7cj47p.apps.googleusercontent.com
//android 697334879439-juooam1g4q19cb9fig3glob281tn2qel.apps.googleusercontent.com