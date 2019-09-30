import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Customer } from './customer';
import { debounceTime } from 'rxjs/operators';

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
  emailMessage: string;

  //Return all the form array of form groups values
  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('frmAddresses');
  }

  //Better to get from service, backend, or file
  private validationMessages = {
    required: "Please enter your email address.",
    email: "Please enter a valid email address."
  }

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
      sendCatalog: true,
      frmAddresses: this.fb.array([this.buidAddress()])
    })

    //Adjusting validation changes 
    this.customerForm.get('notification').valueChanges.subscribe(value =>
      this.setNotification(value));

    const emailControl = this.customerForm.get('emailGroup.email');
    //Email watcher with debounce delay 1 second
    emailControl.valueChanges.pipe(debounceTime(1000)).subscribe(value => this.setMessage(emailControl));
  }

  //Refactor method to the dynamic form group of address
  buidAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    });
  }

  addAddress(): void {
    this.addresses.push(this.buidAddress());
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

  //Set email notification message
  setMessage(control: AbstractControl): void {
    this.emailMessage = '';
    if ((control.touched || control.dirty) && control.errors) {
      this.emailMessage = Object.keys(control.errors).map(key => this.validationMessages[key]).join(' ');
    }
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
