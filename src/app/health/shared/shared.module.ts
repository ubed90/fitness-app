import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MealsService } from './services/meals/meals.service';
import { ListItemComponent } from './components/list-item/list-item.component';
import { WorkoutsService } from './services/workouts/workouts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { JoinPipe } from './pipes/join-pipe/join.pipe';
import { WorkoutPipe } from './pipes/workout-pipe/workout.pipe';



@NgModule({
  declarations: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule
  ],
  exports: [ListItemComponent, ReactiveFormsModule, JoinPipe, WorkoutPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [MealsService, WorkoutsService]
    }
  }
}
