import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/product'
  },
  {
    path: '',
    loadChildren: () => import('./product/product.module').then(m=>m.ProductModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then(m=>m.WishlistModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m=>m.CartModule)
  },
  {
    path: 'counter',
    loadChildren: () => import('./counter/counter.module').then(m=>m.CounterModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./ngrx-books/ngrx-books.module').then(m=>m.NgrxBooksModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
