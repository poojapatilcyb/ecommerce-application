import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilterRoutingModule } from './filter-routing.module';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FilterRoutingModule
  ],
  exports: [
    FilterComponent
  ]
})
export class FilterModule { }
