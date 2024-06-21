import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Product } from '../../../Model/product.model';
import { ProductService } from '../../service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from '../../service/localstorage/localstorage.service';
import { Subscription } from 'rxjs';
import { FilterService } from '../../service/filter/filter.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  cartItemCount: number = 0;
  products: Product[] = [];
  categoryId: string | null = null;
  rating: number = 0;
  private filterSubscription: Subscription = new Subscription();;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private localStorageService: LocalstorageService,
    private filterService: FilterService
  ) {}
 
  ngOnInit(): void {
    // Check if the 'categoryId' parameter is present in the route
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.categoryId = params.get('id');
        this.getCategroywiseProducts();
      } else {
        this.getProducts();
      }
    });

    // filter the product kist based on filter string
    this.filterService.filter$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((filterValue)=> {this.filterProducts(filterValue)});

    // get productlist according to ratings
    this.filterService.getRatingsValue().subscribe((rating)=> { console.log(rating);
      if(rating > 0) {
        this.productService.getProducts().subscribe(product =>{
          this.products = product.filter(item => item?.rating >= rating);
        });
      }
    });

    this.filterService.getRateRangeFilter().subscribe((range) => {
      console.log(range);
      this.productService.getProducts().subscribe(product =>{
        this.products = product;
        if(range.max === '50001'){
          this.products = product.filter(item => item?.price >= range.min);console.log(this.products)
        }else {
          this.products = product.filter(item => item?.price >= range.min && item.price < range.max );console.log(this.products)
        }
      });
    });

    // this.filterService.getselectedBrandBehaviourSubject().subscribe((data) => {
    //   console.log(data);
    //   if(data){
    //     this.productService.getProducts().subscribe(product =>{
    //       // data.map((selectedBrand) => { console.log(selectedBrand.id)
    //       //   this.products = product.filter((prod)=> { console.log(prod.id)
    //       //     return selectedBrand.id == prod.brand_id;
    //       //   })
    //       // })
    //       this.products = product.filter(product =>
    //         data.some(brand => brand.id === product.brand_id)
    //       );           
    //     })
    //   }
      
    // })
  }
 
  getProducts(){
    this.productService.getProducts().subscribe((data)=>{
      this.products = data;
    })
  }
 
  onClickWishlist(id:number){
    const existingIds = this.localStorageService.getItem('wishlistItemIds');
    let idsArray: number[] = [];
    if(existingIds !== null){
      idsArray = JSON.parse(existingIds);
      idsArray.includes(id) ? '' : idsArray.push(id);
      this.localStorageService.setItem('wishlistItemIds', JSON.stringify(idsArray));
    }else {
      idsArray.push(id);
      this.localStorageService.setItem('wishlistItemIds', JSON.stringify(idsArray));
    }
    this.localStorageService.setItem('wishlistItemCount', JSON.stringify(idsArray.length));
  }
 
  onClickCart(id:number){
    const existingIds = this.localStorageService.getItem('cartItemIds');
    let idsArray: number[] = [];
    if(existingIds !== null){
      idsArray = JSON.parse(existingIds);
    }
      idsArray.push(id);
      this.localStorageService.setItem('cartItemIds', JSON.stringify(idsArray));
      this.localStorageService.setItem('cartItemCount', JSON.stringify(idsArray.length));
  }
 
  getCategroywiseProducts(){
    let params = {'categoryId' : this.categoryId}
    this.productService.getProducts(params).subscribe((data)=> {
      this.products = data;
    })
  }

  filterProducts(filterValue: string) {
    this.productService.getProducts().subscribe(product =>{
      this.products = product.filter(product =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    })    
  }

  getDescriptionStyle(): { [key: string]: string } {
    // Example: Conditionally apply styles based on description length
    const maxLines = 3;
    const lineHeight = 1.4; // Adjust based on your line-height in CSS
    const maxHeight = `${lineHeight * maxLines}px`;

    return {
      'max-height': maxHeight,
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    };
  }
}
