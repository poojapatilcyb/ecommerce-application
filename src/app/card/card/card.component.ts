import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../Model/product.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() showWishlistButtonFlag: boolean = false;
  @Input() showAddToCarttButtonflaf: boolean = false;
  @Input() product: Product | undefined;
  @Output() onClickWishlistEvent = new EventEmitter<number>();
  @Output() onClickCartEvent = new EventEmitter<number>();

  onClickWishlist(id: number){
    this.onClickWishlistEvent.emit(id);
  }
  onClickCart(id: number){
    this.onClickCartEvent.emit(id);
  }
}
