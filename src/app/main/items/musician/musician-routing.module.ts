import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AllMusiciansComponent} from "./all-musicians/all-musicians.component";
import {MusicianDetailsComponent} from "./musician-details/musician-details.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-musicians',
        component: AllMusiciansComponent
      },
      {
        path: ':id',
        component: MusicianDetailsComponent
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
export class MusicianRoutingModule {
}
