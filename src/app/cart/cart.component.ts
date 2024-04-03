import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any = []

  totalAmount: number = 0;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllCartItems();
  }

  getAllCartItems() {
    this.api.getCartItems().subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartItems = res;
        this.getTotalPrice()
      },
      error: (res: any) => {
        console.log(res);
      }
    })
  }


  removeItem(id: any) {
    this.api.removeItemFromCart(id).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: "Deleted",
          text: "Successfully removed from wishlist",
          icon: "success"
        });
        this.api.updateCartCout();
        this.getAllCartItems();
      },
      error: (res: any) => {
        console.log(res);
        Swal.fire({
          title: "Oops...",
          text: "Error in removing item",
          icon: "error"
        });
      }
    })
  }

  getTotalPrice() {
    if (this.cartItems.length > 0) {
      this.totalAmount = Math.ceil(this.cartItems.map((item: any) => item.grandTotal).reduce((amt1: any, amt2: any) => amt1 + amt2))
    }
  }


  handleIncrement(id: any) {
    this.api.incrementCartiItem(id).subscribe({
      next: (res: any) => {
        this.getAllCartItems()
        this.api.updateCartCout()
      },
      error: (res: any) => {
        console.log(res);
        
      }
    })
  }

  handleDecrement(id: any) {
    this.api.decrementCartiItem(id).subscribe({
      next: (res: any) => {
        this.getAllCartItems()
        this.api.updateCartCout()
      },
      error: (res: any) => {
        console.log(res);
        
      }
    })
  }

}
