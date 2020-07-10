import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AllSongsComponent} from "./all-songs/all-songs.component";

const routes: Routes = [
  {
    path: '',
    component: AllSongsComponent
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
export class SongRoutingModule {
}
