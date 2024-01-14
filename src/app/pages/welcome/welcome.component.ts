import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import * as math from 'mathjs';
import { Observable, Observer, debounceTime, startWith } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{
  validateForm: FormGroup;

  get scientificInput() {
    return this.validateForm?.get('scientificInput') as FormControl;
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls['confirm'].updateValueAndValidity());
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      comment: ['', [Validators.required]],
      scientificInput: [0.000001, [Validators.required]]
    });
  }

  ngOnInit(): void {
      const value = 0.0321;
      // from kg to milligram
      const expressionToEvaluate = `${value} milligram`;
      console.log('evaluate', (math.evaluate(expressionToEvaluate).value).toExponential(2))
      this.scientificInput?.valueChanges.pipe(
        startWith(0),
        debounceTime(600)
      ).subscribe((value: number) => {
        //console.log('value bef', value)

        /* if (value > 0 && !value.toString().includes('e')) {
        console.log('value bef', value)
        this.scientificInput.setValue(value?.toExponential(2), {onlySelf: true, emitEvent: false});
        console.log('value aft', this.scientificInput.value)
        } */
      })
  }
}

