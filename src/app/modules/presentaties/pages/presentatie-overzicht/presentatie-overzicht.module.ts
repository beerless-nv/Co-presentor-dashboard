import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {FileDropModule} from 'ngx-file-drop';
import {CrudSynoniemComponent} from '../../../../shared/components/crud-synoniem/crud-synoniem.component';
import {CrudSynoniemModule} from '../../../../shared/components/crud-synoniem/crud-synoniem.module';
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
    ReactiveFormsModule,
    FileDropModule,
    CrudSynoniemModule
  ],
  declarations: [
    PresentatieOverzichtPage,
    PresentatieCardComponent,
    PresentatieModalComponent,
  ],
  entryComponents: [
    PresentatieModalComponent
  ]
})
export class PresentatieOverzichtPageModule {
}
