import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Customer } from './customer';

function rangeValiadator(min: number, max: number): ValidatorFn {
  return (params: AbstractControl): { [key: string]: boolean } | null => {
    if (params.value !== null && (isNaN(params.value) || params.value < 1 || params.value > 5))
      return { 'range': true };
    else
      return null;
  };
}

function emailMatcher(params: AbstractControl): { [key: string]: boolean } | null {
  const email = params.get('email');
  const confirmEmail = params.get('confirmEmail');
  if (email.pristine || confirmEmail.pristine) {
    return null;
  }
  if (email.value === confirmEmail.value) {
    return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }, { validators: emailMatcher }),
      phone: '',
      notification: 'email',
      rating: ['', rangeValiadator(1, 5)],
      sendCatalog: true
    })
    /*this.customerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true)
    });*/
  }
  //Set required validators on Sms phone radio selection
  setNotification(notifyType: string): void {
    const phone = this.customerForm.get('phone');
    if (notifyType == 'email') {
      phone.clearValidators();
    }
    else {
      phone.setValidators([Validators.required]);
    }
    phone.updateValueAndValidity();
  }

  testData(): void {
    //setValue for all form controls
    //patchValue for specific controls of the form
    this.customerForm.patchValue({
      firstName: "First name",
      lastName: "Last name",
      email: "email@email.com",
      phone: '',
      sendCatalog: false
    })
  }
  //Save customer data
  save(): void {
    console.log(JSON.stringify(this.customerForm.value))
  }
}
