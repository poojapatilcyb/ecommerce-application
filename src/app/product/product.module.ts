import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { FilterModule } from '../filter/filter.module';
import { CardModule } from '../card/card.module';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    FilterModule,
    CardModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
