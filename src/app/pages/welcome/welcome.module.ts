import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ExponentialFormatPipe } from './pipes/exponential-format.pipe';
import { WelcomeComponent } from './welcome.component';
import { ScientificFormatDirective } from './directives/scientific-format.directive';


@NgModule({
  imports: [WelcomeRoutingModule, NzButtonModule, NzFormModule, ReactiveFormsModule],
  declarations: [WelcomeComponent, ExponentialFormatPipe, ScientificFormatDirective],
  exports: [WelcomeComponent, ExponentialFormatPipe, ScientificFormatDirective]
})
export class WelcomeModule { }
