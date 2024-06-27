import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './card/card.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    CardComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    CardRoutingModule
  ],
  exports: [
    CardComponent,
    NotFoundComponent
  ]
})
export class CardModule { }
