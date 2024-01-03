import { Component } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { DialogComponent } from "../dialog/dialog.component";

@Component ({
  templateUrl: 'cart.component.html',
  styleUrls: [ 'cart.component.css' ]
})
export class CartComponent {

  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'delete'];
  constructor(private cartService: CartService, private router:Router, private dialog: MatDialog) {}

  get cartItems(): any[] {
    return this.cartService.getCartItems();
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCartItem(item);
    }
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.cartService.updateCartItem(item);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  deleteItem(item: any): void {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${item.title} from the cart?`);

    if (isConfirmed) {
      this.cartService.removeFromCart(item);
    }
  }

  checkout(): void {
    this.router.navigate(['checkout']);
  }

  deleteAllItems() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.width = '350px';
    dialogConfig.height = '350px';
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterOpened().subscribe( ()=> {
      console.log('open')
    })

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
        this.cartService.removeAllItems();
      }
    }
    );
  }
}
