import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AllSingersComponent} from "./all-singers/all-singers.component";
import {SingerDetailsComponent} from "./singer-details/singer-details.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-singers',
        component: AllSingersComponent
      },
      {
        path: ':id',
        component: SingerDetailsComponent
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SingerRoutingModule {
}
