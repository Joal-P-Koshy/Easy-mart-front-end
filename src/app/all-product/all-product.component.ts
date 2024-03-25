import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit{

  allproduct: any = []

  constructor(private api: ApiService) {}

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

  addtoWishlist(){
    Swal.fire({
      title: "Added",
      text: "Successfully added to wishlist",
      icon: "success"
    });
  }

  addtoCart(){
    alert('inside cart')
  }
}
