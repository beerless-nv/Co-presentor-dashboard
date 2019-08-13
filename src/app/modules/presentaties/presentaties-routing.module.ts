import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/presentatie-overzicht/presentatie-overzicht.module#PresentatieOverzichtPageModule'
  },
  {
    path: ':id',
    loadChildren: './pages/presentatie-detail/presentatie-detail.module#PresentatieDetailPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentatiesRoutingModule { }
