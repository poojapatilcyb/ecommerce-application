import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../Model/product.model';
import { ProductService } from '../../service/product/product.service';
import { LocalstorageService } from '../../service/localstorage/localstorage.service';
import { Cart } from '../../../Model/cart.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  cartData: Cart[] = [];
  totalPrice: number = 0;
  errorMessage: string = '';
  private productsSubscription: Subscription | undefined;

  constructor(
    private service: ProductService,
    private localStorageService: LocalstorageService
  ){}
   
  ngOnInit(): void {
    this.getWishlistProducts();
  }
 
  getWishlistProducts(){
    let localArray = this.localStorageService.getItem('cartItemIds');
    if(localArray !== null) {
      let idsArray: number[] = JSON.parse(localArray);
      this.productsSubscription = this.service.getProducts().subscribe({
        next: (data: Product[]) => { 
          const productData = data.filter(item => idsArray?.includes(item.id));
          productData.forEach(product => {
            const count = idsArray.filter(id => id === product.id).length;
            // Check if product already exists in cartData
            const existingProductIndex = this.cartData.findIndex(cart => cart.id === product.id);
            if (existingProductIndex === -1) {
              // Product doesn't exist in cartData, so add it
              this.cartData.push({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  rating: product.rating,
                  categoryId: product.categoryId,
                  img: product.img,
                  description: product.description,
                  brand_id: product.brand_id,
                  count: count
              });
            } else {
                // Product already exists in cartData, update count
                this.cartData[existingProductIndex].count += count;
            }
          });
          this.calculateTotal(this.cartData);
        },
        error: (error) => { this.errorMessage = error; },
        complete: () => { console.log('complete getBrand Observable')}
      });
    }
  }

  calculateTotal(cart: Cart[]) {
    cart.forEach((item) => {
      this.totalPrice += (item.price*item.count);
    });
  }

  removeCartItem(id: number) {
    let localArray = this.localStorageService.getItem('cartItemIds');
    if(localArray !== null) {
      let idsArray: number[] = JSON.parse(localArray);
      const indexToRemove = idsArray.indexOf(id);
      if(indexToRemove>=0) {
        idsArray.splice(indexToRemove, 1);
        this.localStorageService.setItem('cartItemIds', JSON.stringify(idsArray));
        location.reload();
      }
    }
  }

  addCartItem(id: number) {
    let localArray = this.localStorageService.getItem('cartItemIds');
    if(localArray !== null) {
      let idsArray: number[] = JSON.parse(localArray);
      idsArray.push(id);
      this.localStorageService.setItem('cartItemIds', JSON.stringify(idsArray));
      location.reload();
    }
  }

  ngOnDestroy(): void {
    if(this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
