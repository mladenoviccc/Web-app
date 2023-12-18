import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component ({
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit{
  processing = false;
  contactForm: FormGroup;
  showSuccessMessage = false

  constructor (private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required, Validators.minLength(3)],
      lastName: ['', Validators.required, Validators.maxLength(20)],
      email: ['', Validators.required],
      subject: ['', Validators.required, Validators.maxLength(200)]
    })
  }

  save() {
    this.showSuccessMessage = true
    this.processing = true;
    setTimeout(() => {
      this.contactForm.reset();
      this.processing = false;
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000)
    }, 2000);
  }
}
