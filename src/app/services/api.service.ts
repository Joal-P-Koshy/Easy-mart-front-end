import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = 'http://localhost:3500'

  constructor(private http: HttpClient) { }

  //get all products api call
  getAllProductsApi() {
    return this.http.get(`${this.server_url}/all-product`)
  }

  // register user
  registerUserApi(user: any) {
    return this.http.post(`${this.server_url}/register`, user)
  }

  // register user
  loginUserApi(user: any) {
    return this.http.post(`${this.server_url}/login`, user)
  }
}
