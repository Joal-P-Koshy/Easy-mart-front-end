import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginUserName: any = "";

  ngOnInit(): void {
    if (sessionStorage.getItem('username')) {
      this.loginUserName = sessionStorage.getItem('username')
    }
    else {
      this.loginUserName = "";
    }
  }

}
