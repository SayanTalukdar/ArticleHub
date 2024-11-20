import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  displayMsg: string = "";
  isAccountCreated: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  submit() {
    const { name, email, password } = this.signupForm.value;
    this.userService.signup({ name, email, password }).subscribe(
      (res) => {
        this.displayMsg = "Account Created Successfully! ";
        this.isAccountCreated = true;
        setTimeout(() => {
          this.router.navigate(["user/login"])
        }, 2000)
      },
      (error) => {
        console.log(error)
      }
    )
  }
}

