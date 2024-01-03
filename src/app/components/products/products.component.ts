import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
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
  pageIndex: number = 0;
  pageSize: number = 6;
  length: number = 0;
  productsPage: any = [];

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
          this.length = this.products.length;
          this.pageIndex = 0;
          this.productsPage = this.products.slice(0, this.pageSize)
          })
        });
      }

      onPageChange(event: PageEvent) {
        const startIndex = event.pageIndex * event.pageSize;
        const endIndex = startIndex + event.pageSize;
        this.productsPage = this.products.slice(startIndex, endIndex);
      }

  navigate (id: number) {
    this.router.navigate([`products/${id}`]);
  }

  sortByLowToHigh() {
    this.productsPage.sort((a: any, b: any) => a.price - b.price);
  }

  sortByHighToLow() {
    this.productsPage.sort((a: any, b: any) => b.price - a.price);
  }

  sortAlphabetically() {
    this.productsPage.sort((a: any, b: any) => {
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
