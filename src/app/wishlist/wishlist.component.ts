import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishListItems: any = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllWishListItems();
  }

  getAllWishListItems() {
    this.api.getWishListItems().subscribe({
      next: (res: any) => {
        console.log(res);
        this.wishListItems = res;
      },
      error: (res: any) => {
        console.log(res);
      }
    })
  }

  removeItem(id: any){
    this.api.removeItemFromWishlist(id).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: "Deleted",
          text: "Successfully removed from wishlist",
          icon: "success"
        });
        this.api.updateWishlistCout()
        this.api.updateCartCout()
        this.getAllWishListItems();
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


  addtoCart(product: any) {
    if (sessionStorage.getItem('token')) {
      Object.assign(product, { quantity: 1 })
      this.api.addToCartApi(product).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: "Added",
            text: "Successfully added to cart",
            icon: "success"
          });
        },
        error: (res: any) => {
          Swal.fire({
            title: "Error",
            text: res.error,
            icon: "error"
          });
        }
      })
    }
    else {
      Swal.fire({
        title: "Warning",
        text: "Please login",
        icon: "warning"
      });
    }
  }
}
