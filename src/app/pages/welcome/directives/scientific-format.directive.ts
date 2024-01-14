/* /// exponential-format.directive.ts

import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appExponentialFormat]'
}) */
// scientific-format.directive.ts

import { Directive, ElementRef, HostListener, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const SCIENTIFIC_FORMAT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ScientificFormatDirective),
  multi: true,
};

@Directive({
  selector: '[appScientificFormat]',
  providers: [SCIENTIFIC_FORMAT_VALUE_ACCESSOR]
})
export class ScientificFormatDirective implements ControlValueAccessor {
  //@Input('appScientificFormat') precision: number = 2;
  precision = 2;
  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: number) {
    console.log('value', value)
    if (typeof(value) === 'number' && value > 0) {
      const scientificValue = value?.toExponential(this.precision);
      this.el.nativeElement.value = scientificValue;
      this.onChange(scientificValue);
    } else if (typeof(value) === 'string' && !!value) {
      console.log('typeof === string')
      const scientificValue = Number.parseFloat(value)?.toExponential(this.precision);
      this.el.nativeElement.value = scientificValue;
      this.onChange(scientificValue);
    }
    
    this.onTouch();
  }

  writeValue(value: any): void {
    this.el.nativeElement.value = value.toExponential(this.precision);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }
}
