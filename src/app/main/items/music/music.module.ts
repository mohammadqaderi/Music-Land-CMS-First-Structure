import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMusicsComponent } from './all-musics/all-musics.component';
import {SongRoutingModule} from "../song/song-routing.module";
import {SharedModule} from "../../../Shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../../pipes/pipes.module";
import {MusicRoutingModule} from './music-routing.module';


@NgModule({
  declarations: [AllMusicsComponent],
  imports: [
    CommonModule,
    MusicRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class MusicModule { }
