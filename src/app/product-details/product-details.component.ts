import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

   productDetailsTitle: string
   products: IProducts[]

  constructor(private router: Router, private activeRoute: ActivatedRoute
    , private productService: ProductService) { }

  ngOnInit() : void {
    this.getProducts();
    let productId = +this.activeRoute.snapshot.paramMap.get('id');
    this.productDetailsTitle = `Product details: ${productId}`;
    console.log(this.products)
  }

getProducts() : void{
  this.productService.getProductsList().subscribe(
    {
        next: productArr => {
            this.products = productArr
        }
    }
)
}

  backRouter(): void {
    this.router.navigate(['/products']);
  }
}
