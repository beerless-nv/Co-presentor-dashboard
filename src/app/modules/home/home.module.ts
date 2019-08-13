import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {IndexPageModule} from './pages/index/index.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IndexPageModule
  ]
})
export class HomeModule {
}
