import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router){}

  loginUserName: any = "";

  ngOnInit(): void {
    if (sessionStorage.getItem('username')) {
      this.loginUserName = sessionStorage.getItem('username')
    }
    else {
      this.loginUserName = "";
    }
  }

  logout(){
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    this.route.navigateByUrl('');
    this.loginUserName = '';
  }
}
