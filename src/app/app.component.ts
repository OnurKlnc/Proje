import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


 firebase.initializeApp({
  apiKey: "AIzaSyDl5SGYlzax3THixtgCbP-ER-L7Qb-XaQE",
    authDomain: "cuma-44d7b.firebaseapp.com",
    databaseURL: "https://cuma-44d7b.firebaseio.com",
    projectId: "cuma-44d7b",
    storageBucket: "cuma-44d7b.appspot.com",
    messagingSenderId: "299618883319"
  });

  }
 


}

