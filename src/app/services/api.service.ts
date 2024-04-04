import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = 'http://localhost:3500'

  constructor(private http: HttpClient) {
    this.updateWishlistCout()
    this.updateCartCout()
  }

  // common function for header creation 
  addTokenHeader() {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return { headers }
  }



  // behavior subject 
  wishlistCount = new BehaviorSubject(0)
  updateWishlistCout() {
    this.getWishListItems().subscribe((res: any) => {
      this.wishlistCount.next(res.length)
    })
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


   // behavior subject 
   cartCount = new BehaviorSubject(0)
   updateCartCout() {
     this.getCartItems().subscribe((res: any) => {
       this.cartCount.next(res.length)
     })
   }

  // Add to cart
  addToCartApi(product: any) {
    return this.http.post(`${this.server_url}/add-cart`, product, this.addTokenHeader())
  }

  // get from cart
  getCartItems() {
    return this.http.get(`${this.server_url}/cart/all-product`, this.addTokenHeader())
  }
  
  // remove item from cart
  removeItemFromCart(id: any) {
    return this.http.delete(`${this.server_url}/cart/removeItem/${id}`, this.addTokenHeader())
  }


  // increment item in cart
  incrementCartiItem(id: any) {
    return this.http.get(`${this.server_url}/cart/increment/${id}`, this.addTokenHeader())
  }


  // decrement item in cart
  decrementCartiItem(id: any) {
    return this.http.get(`${this.server_url}/cart/decrement/${id}`, this.addTokenHeader())
  }

  // remove all items in cart
  emptyCartItems() {
    return this.http.delete(`${this.server_url}/removeCart`, this.addTokenHeader())
  }

}
