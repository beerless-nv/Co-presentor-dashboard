import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'presentaties',
    loadChildren: './modules/presentaties/presentaties.module#PresentatiesModule'
  },
  {
    path: 'definities',
    loadChildren: './modules/definities/definities.module#DefinitiesModule'
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
