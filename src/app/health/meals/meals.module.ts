import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealsRoutingModule } from './meals-routing.module';
import { MealsComponent } from './containers/meals/meals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MealsComponent
  ],
  imports: [
    CommonModule,
    MealsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MealsModule { }
