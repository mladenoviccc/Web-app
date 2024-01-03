import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";


@Component({
    templateUrl: './home-page.component.html',
    styleUrls: [ './home-page.component.css' ]
})
export class HomePageComponent  {
  public pageTitle = 'Home Page';

  constructor(private router: Router) { }

  navigate () {
    this.router.navigate(['/contact']);
  }
}
