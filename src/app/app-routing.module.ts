import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'form-schedule', loadChildren: './form-schedule/form-schedule.module#FormSchedulePageModule' },
  { path: 'form-schedule/:id', loadChildren: './form-schedule/form-schedule.module#FormSchedulePageModule' },
  { path: 'location', loadChildren: './location/location.module#LocationPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'signup', loadChildren: './auth/signup/signup.module#SignupPageModule' },
  { path: 'forgot-password', loadChildren: './auth/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
