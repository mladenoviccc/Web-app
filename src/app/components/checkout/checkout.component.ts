import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatStepper } from "@angular/material/stepper";
import { Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";

@Component ({
  templateUrl: 'checkout.component.html',
  styleUrls: ['chekcout.component.css']
})
export class CheckoutComponent implements OnInit{
  constructor(private _formBuilder: FormBuilder, private cartService: CartService, private router: Router, private snackBar: MatSnackBar) { }

  isLinear = true;
  cash = false;
  creditcard = false;
  cartItems: any[] = [];
  displayedColumns: string[] = ['name', 'price', 'quantity'];
  @ViewChild('stepper') stepper: MatStepper;
  usaStates: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];
  months: string [] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  years: string [] = ['2023', '2024', '2025', '2026', '2027', '2028','2029', '2030','2031','2032', '2033']

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    creditCardName: ['', Validators.required],
    creditCardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    expirationMonth: ['', Validators.required],
    expirationYear: ['', Validators.required]
  });

  toggleCash() {
    this.cash = true
    this.creditcard = false;
  }

  toggleCreditCard() {
    this.creditcard = true;
    this.cash = false;
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  buy(): void {
    this.snackBar.open('Your order has been confirmed. You will receive an email with a confirmation number.', '', {
      duration: 5000,
    });
    if (this.stepper) {
      this.stepper.reset();
    }
    this.cartService.removeAllItems();
    this.router.navigate(['/home']);
  }
}
