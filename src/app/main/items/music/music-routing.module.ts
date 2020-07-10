import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AllMusicsComponent} from "./all-musics/all-musics.component";

const routes: Routes = [
  {
    path: '',
    component: AllMusicsComponent
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
export class MusicRoutingModule {
}
