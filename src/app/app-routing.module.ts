import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './user/user.module#UserModule' }
];

export const AppRoutes = RouterModule.forRoot(routes, { useHash: false });

