import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  allproduct: any = []

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.api.getAllProductsApi().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.allproduct = res;
      },
      error: (res: any) => {
        console.log(res);

      }
    })
  }

  addtoWishlist(product: any) {

    if (sessionStorage.getItem('token')) {
      this.api.addToWishlistApi(product).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: "Added",
            text: "Successfully added to wishlist",
            icon: "success"
          });
          this.api.updateWishlistCout()
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
          this.api.updateCartCout();
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
