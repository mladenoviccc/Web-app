import { Component } from "@angular/core";
import { CartService } from "src/app/services/cart.service";

@Component ({
  templateUrl: 'cart.component.html',
  styleUrls: [ 'cart.component.css' ]
})
export class CartComponent {

  constructor(private cartService: CartService) {}

  get cartItems(): any[] {
    return this.cartService.getCartItems();
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}
