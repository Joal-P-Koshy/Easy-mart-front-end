import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-z0-9]*')]]
  })

  loginUser(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      console.log( email, password);
      const user = {
        email, 
        password
      }
    this.api.loginUserApi(user).subscribe({
      next: (res: any) =>{
        sessionStorage.setItem('username', res.existingUser.username);
        sessionStorage.setItem('token', res.token)
        Swal.fire({
          title: "Logged in",
          text: "Successfully logged in",
          icon: "success"
        });
        this.router.navigateByUrl('');
      },
      error: (res: any)=>{
        Swal.fire({
          title: "Error",
          text: "Failed to login",
          icon: "error"
        });
      }
    })
    }
  }
}
