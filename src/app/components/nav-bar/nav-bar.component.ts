import { Component, EventEmitter, Output } from "@angular/core";
import { CartService } from "src/app/services/cart.service";

@Component ({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: [ './nav-bar.component.css' ]
})
export class NavBarComponent {

  enterSearchValue: string = '';

  @Output()
  searchTextChanged: EventEmitter <string> = new EventEmitter <string>();

  emitSearchValue() {
    this.searchTextChanged.emit(this.enterSearchValue);
  }

  constructor(private cartService: CartService) {}

  get totalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }
}
