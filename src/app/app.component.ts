import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: any = [];
  searchText: string = '';

  constructor(private router:Router) {}

  navigate (id: number) {
    this.router.navigate([`products/${id}`]);
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText);

    if (this.searchText != "") {
      this.router.navigate(
        ['/products'],
        { queryParams: { search: this.searchText } }
      );
    } else {
      this.router.navigate([`products`]);
    }
  }
}
