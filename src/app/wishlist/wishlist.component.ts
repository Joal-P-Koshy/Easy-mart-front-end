import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

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

    })
  }

}
