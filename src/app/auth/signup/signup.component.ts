import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'

import { AuthService } from '../auth.service'
import { load } from '../../shared/animation'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  animations: [ load ]
})
export class SignupComponent implements OnInit, OnDestroy {
  message: string

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.error
      .subscribe(
        (error) => this.message = error.message
      )
  }
  onSignup(form: NgForm) {
    const email = form.value.email
    const password = form.value.password
    this.authService.signupUser(email, password)
  }
  ngOnDestroy() {
    this.authService.error
      .unsubscribe()
  }
}