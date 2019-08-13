import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {PresentatieCardComponent} from '../../components/presentatie-card/presentatie-card.component';
import {PresentatieModalComponent} from '../../components/presentatie-modal/presentatie-modal.component';
import {PresentatieOverzichtPage} from './presentatie-overzicht.page';

const routes: Routes = [
  {
    path: '',
    component: PresentatieOverzichtPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    PresentatieOverzichtPage,
    PresentatieCardComponent,
    PresentatieModalComponent
  ],
  entryComponents: [
    PresentatieModalComponent
  ]
})
export class PresentatieOverzichtPageModule {
}
