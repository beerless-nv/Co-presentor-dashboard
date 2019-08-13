import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/definitie-overzicht/definitie-overzicht.module#DefinitieOverzichtPageModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinitiesRoutingModule {
}
