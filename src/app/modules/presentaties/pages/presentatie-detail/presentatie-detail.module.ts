import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PresentatieDetailItemComponent} from '../../components/presentatie-detail-item/presentatie-detail-item.component';

import {PresentatieDetailPage} from './presentatie-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PresentatieDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
  declarations: [
    PresentatieDetailPage,
    PresentatieDetailItemComponent
  ]
})
export class PresentatieDetailPageModule {
}
