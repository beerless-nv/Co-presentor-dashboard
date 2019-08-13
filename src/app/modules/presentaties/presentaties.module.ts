import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PresentatiesRoutingModule} from './presentaties-routing.module';
import {PresentatiesService} from './shared/presentaties.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PresentatiesRoutingModule,
  ],
  providers: [
    PresentatiesService
  ]
})
export class PresentatiesModule {
}
