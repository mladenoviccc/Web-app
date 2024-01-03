import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { CartService } from "src/app/services/cart.service";

@Component ({
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  product: any = []
  id: string | null  = '';
  discountedPrice: number | undefined;
  originalPrice: number | undefined;
  discountPercentage: number | undefined;
  message: string | null = '';
  showMessage: boolean = false;

  constructor(private apiService: ApiService, private route:ActivatedRoute,  private cartService: CartService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.apiService.getProduct(this.id).subscribe(response =>{
      this.product = response;
      this.originalPrice = this.product.price;
      this.discountedPrice = this.product.price - ((this.product.price * this.product.discountPercentage)/100);
    })
  }

  calculateDiscount(): void {
    this.product.price = this.discountedPrice;
    this.showMessage = true;
    this.message = `This is the discounted percentage: ${this.product.discountPercentage}%`
  }

  calculateOriginalPrice(): void {
    this.product.price = this.originalPrice;
    this.showMessage = false;
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.snackBar.open(`${this.product.title} was added to the cart!`, '', {
      duration: 3000,
    });
    console.log('Product added to cart:', this.product);
  }
}
