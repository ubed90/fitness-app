import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MealsService } from './services/meals/meals.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [MealsService]
    }
  }
}
