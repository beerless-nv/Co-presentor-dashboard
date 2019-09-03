import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FileDropModule} from 'ngx-file-drop';
import {PresentatieDetailItemComponent} from '../../components/presentatie-detail-item/presentatie-detail-item.component';
import {PresentatieZwevendeTekstItemComponent} from '../../components/presentatie-zwevende-tekst-item/presentatie-zwevende-tekst-item.component';
import {PresentatieZwevendeTekstComponent} from '../../components/presentatie-zwevende-tekst/presentatie-zwevende-tekst.component';

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
    NgbModule,
    FileDropModule
  ],
  declarations: [
    PresentatieDetailPage,
    PresentatieDetailItemComponent,
    PresentatieZwevendeTekstItemComponent,
    PresentatieZwevendeTekstComponent
  ],
  entryComponents: [
    PresentatieZwevendeTekstComponent
  ]
})
export class PresentatieDetailPageModule {
}
