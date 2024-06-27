import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../Model/product.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() product: Product | undefined;
  @Input() showWishlistButtonFlag: boolean = false;
  @Input() showAddToCartButtonflag: boolean = false;
  @Input() showRemoveWishlistItemButtonflag: boolean = false;

  @Output() onClickWishlistEvent = new EventEmitter<number>();
  @Output() onClickCartEvent = new EventEmitter<number>();
  @Output() onClickRemoveWishlistItemEvent = new EventEmitter<number>();

  onClickWishlist(id: number){
    this.onClickWishlistEvent.emit(id);
  }
  onClickCart(id: number){
    this.onClickCartEvent.emit(id);
  }

  onRemovefromWishlist(id: number){
    this.onClickRemoveWishlistItemEvent.emit(id);
  }
}
