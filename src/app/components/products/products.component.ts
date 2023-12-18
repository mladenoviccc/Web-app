import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";

@Component ({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export default class ProductsComponent implements OnInit {
  products: any = [];
  searchedValue: string = '';
  showNoResults = false;

  constructor(private apiService: ApiService, private router:Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.searchedValue = params['search'];
        console.log(this.searchedValue);

        this.apiService.getAllProducts().subscribe(response => {
          this.products = response.products;

          if (this.searchedValue)
          {
            this.products = this.products.filter((x: any) => x.title.toLowerCase().includes(this.searchedValue.toLowerCase()));
            this.showNoResults = this.products.length === 0;
          } else {
            this.showNoResults = false;
          }
          })
        });
      }


  navigate (id: number) {
    this.router.navigate([`products/${id}`]);
  }

  sortByLowToHigh() {
    this.products.sort((a: any, b: any) => a.price - b.price);
  }

  sortByHighToLow() {
    this.products.sort((a: any, b: any) => b.price - a.price);
  }

  sortAlphabetically() {
    this.products.sort((a: any, b: any) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) {
        return -1;
      } else if (titleA > titleB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
