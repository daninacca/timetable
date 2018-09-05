import * as firebase from 'firebase'
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
    token: string
    error = new Subject<any>()

    constructor(private router: Router) {}

    signupUser(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => this.error.next(error)
            )
    }
    signInUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.router.navigate(['/'])
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => this.token = token
                        )
                }
            )
            .catch(
                error => this.error.next(error)
            )
    }
    logout() {
        firebase.auth().signOut()
        this.token = null
    }
    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            )
        return this.token
    }
    isAuthenticated() {
        return this.token != null
    }
}