import { Routes } from "@angular/router";
import { ProductsDetailsComponent } from "./components/details/products-details.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import ProductsComponent from "./components/products/products.component";
import { ContactComponent } from "./components/contact/contact.component";
import { CartComponent } from "./components/cart/cart.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";

export const appRoutes:Routes = [
    { path: 'home', component: HomePageComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'products/:id', component: ProductsDetailsComponent},
    { path: 'cart', component: CartComponent},
    { path: 'checkout', component: CheckoutComponent},
    { path: '', redirectTo:'/home', pathMatch: 'full'},
]

