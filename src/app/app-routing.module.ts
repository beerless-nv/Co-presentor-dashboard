import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/authentication/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'presentaties',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'presentaties',
    loadChildren: './modules/presentaties/presentaties.module#PresentatiesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'definities',
    loadChildren: './modules/definities/definities.module#DefinitiesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-in',
    loadChildren: './modules/sign-in/sign-in.module#SignInModule'
  },
  {
    path: 'sign-up',
    loadChildren: './modules/sign-up/sign-up.module#SignUpModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
