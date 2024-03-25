import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // inject formBuilder
  constructor(private fb:FormBuilder){}

  registerForm = this.fb.group({
    username : ['sfs', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    email: ['adca', Validators.required, Validators.email],
    password: ['sd', Validators.required, Validators.pattern('[a-zA-z0-9]*')]

  })
}
