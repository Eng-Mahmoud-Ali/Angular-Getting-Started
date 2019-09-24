import { Component, OnInit, Output } from "@angular/core";
import { ProductService } from '../service/product.service';

@Component({
    templateUrl: './products-list.component.html',
    // selector: 'app-products'
})

export class ProductsListComponent implements OnInit {

    isShowImage: boolean = true
    _filterByTextVar = ""
    get filterByText(): string {
        return this._filterByTextVar;
    }
    set filterByText(value: string) {
        this._filterByTextVar = value.toLocaleLowerCase();
        this.filteredProducts = this._filterByTextVar ? this.performFilterProducts() : this.products;
    }

    pageTitle: string = 'Products list'
    imageWidth: number = 40;
    imageHeight: number = 40;
    products: IProducts[]
    filteredProducts: IProducts[]
    errorMessage: string
    constructor(private productservice: ProductService) {
    }

    ngOnInit(): void {
        this.productservice.getProductsList().subscribe(
            {
                next: productArr => {
                    this.products = productArr,
                        this.filteredProducts = this.products
                }
                //,error: err => this.errorMessage = err
            }
        )
    }
    performFilterProducts(): IProducts[] {
        return this.products.filter((product: IProducts) => product.productName.toLocaleLowerCase().indexOf(this.filterByText) !== -1);
    }

    toogleImage(): void {
        this.isShowImage = !this.isShowImage;
    }

    productClicked(message: string): void {
        this.pageTitle = message;
    }
}

