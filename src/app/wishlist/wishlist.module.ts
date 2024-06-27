import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CardModule } from '../card/card.module';


@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    WishlistRoutingModule
  ]
})
export class WishlistModule { }
