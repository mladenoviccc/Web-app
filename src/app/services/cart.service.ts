import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {
    const storedCartItems = localStorage.getItem('cartItems');
    this.cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
  }

  addToCart(item: any): void {
    const existingItem = this.cartItems.find((cartItem) =>  cartItem.id === item.id && cartItem.price === item.price);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      item.quantity = 1;
      this.cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  updateCartItem(item: any): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  removeFromCart(item: any): void {
    this.cartItems = this.cartItems.filter((cartItem) =>  cartItem.id === item.id && cartItem.price === item.price);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeAllItems(): void {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
  }
}
