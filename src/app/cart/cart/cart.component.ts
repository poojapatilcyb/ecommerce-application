import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../Model/product.model';
import { ProductService } from '../../service/product/product.service';
import { Cart } from '../../../Model/cart.model';
import { Subscription } from 'rxjs';
import { CartService } from '../../service/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  cartData: Cart[] = [];
  totalPrice: number = 0;
  totalCartItems: number = 0;
  errorMessage: string = 'No products found in cart. Please add product.';
  productData: Product[] = [];
  private productsSubscription: Subscription | undefined;

  constructor(
    private service: ProductService,
    private cartService: CartService
  ){}
   
  ngOnInit(): void {
    this.getWishlistProducts();
  }
 
  getWishlistProducts(){
    this.cartService.cartItems$.subscribe((localArray)=> { 
      let idsArray: number[] = localArray;
      this.productsSubscription = this.service.getProducts().subscribe({
        next: (data: Product[]) => { 
      this.productData = data.filter(item => idsArray?.includes(item.id));
      this.cartData = this.cartData.filter(item => idsArray?.includes(item.id))
      this.productData.forEach((product)=> {
        let count = 0;
        idsArray.forEach((id)=> {
          if(product.id === id){
            count++;
          }
        });
        if(!this.cartData.some(cart => cart.id == product.id)){
        this.cartData.push({
          id: product.id,
          name: product.name,
          price: product.price,
          rating: product.rating, // Optional property
          categoryId: product.categoryId,
          img: product.img,
          description: product.description,
          brand_id: product.brand_id,
          count,              
        });
      }else {
        this.cartData.map((item)=> {
          if(item.id === product.id){
            item.count = count;
          }
        });
      } 
      });
      this.totalPrice = 0;
      this.totalCartItems = 0;
      this.cartData.map((items)=>{
        this.calculateTotalPrice(items);
        this.calculateTotalCartItems(items);
      })

        },
        error: (error) => { this.errorMessage = error; },
        complete: () => { console.log('complete getBrand Observable')}
      });
    });
  }

  calculateTotalPrice(cart: Cart) {
      this.totalPrice += (cart.price*cart.count);
  }
  calculateTotalCartItems(cart: Cart) {
    this.totalCartItems += cart.count;
}
  removeCartItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  addCartItem(id: number) {
    this.cartService.addToCart(id);
  }

  ngOnDestroy(): void {
    if(this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
