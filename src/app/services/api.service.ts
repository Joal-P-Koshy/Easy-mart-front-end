import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = 'http://localhost:3500'

  constructor(private http: HttpClient) { }

  // common function for header creation 
  addTokenHeader() {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if(token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return {headers}
  }

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

  // get product details by ID 
  getProductApi(id: any) {
    return this.http.get(`${this.server_url}/get-product/${id}`)
  }

  // Add to wishlist
  addToWishlistApi(product: any) {
    return this.http.post(`${this.server_url}/add-wishlist`, product, this.addTokenHeader())
  }

  // get from wishlist
  getWishListItems() {
    return this.http.get(`${this.server_url}/wishlist/all-product`, this.addTokenHeader())
  }

  // remove item from wishlist
  removeItemFromWishlist(id: any) {
    return this.http.delete(`${this.server_url}/wishlist/removeItem/${id}`, this.addTokenHeader())
  }
}
