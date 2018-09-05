import { Component, OnInit } from '@angular/core'
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blackboard'

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBwxgiTPRQHv5zY8oTRdxQkqGY7vTpl6Bg",
      authDomain: "blackboard-53316.firebaseapp.com"
    })
  }
}
