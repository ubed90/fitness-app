import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'schedule',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import("./schedule/schedule.module")).ScheduleModule
  },
  {
    path: 'meals',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import("./meals/meals.module")).MealsModule
  },
  {
    path: 'workouts',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import("./workouts/workouts.module")).WorkoutsModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthRoutingModule { }
