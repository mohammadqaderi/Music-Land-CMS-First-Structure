import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSongsComponent } from './all-songs/all-songs.component';
import {SongRoutingModule} from "./song-routing.module";
import {SharedModule} from "../../../Shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../../pipes/pipes.module";



@NgModule({
  declarations: [AllSongsComponent],
  imports: [
    CommonModule,
    SongRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class SongModule { }
