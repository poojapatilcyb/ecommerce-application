import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Model/product.model';
import { ProductService } from '../../service/product/product.service';
import { LocalstorageService } from '../../service/localstorage/localstorage.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  wishlistData: Product[] = [];
  constructor(
    private service: ProductService,
    private localStorageService: LocalstorageService
  ){}
 
  ngOnInit(): void {
    this.getWishlistProducts();
  }
 
  getWishlistProducts(){
    let localArray = this.localStorageService.getItem('wishlistItemIds');
    if(localArray !== null) {
      let idsArray: number[] = JSON.parse(localArray);
      this.service.getProducts().subscribe(data =>{
        this.wishlistData = data.filter(item => idsArray?.includes(item.id));
      });
    }
  }
}
