import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./modules/material.module";
import {NebularModule} from "./modules/nebular.module";
import {FileModule} from "./modules/file.module";
import {NgxModule} from "./modules/ngx.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ChartsModule} from "ng2-charts";
import { InvalidCredentialsComponent } from './components/invalid-credentials/invalid-credentials.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { EditSongComponent } from './components/edit-song/edit-song.component';
import { DeleteSongComponent } from './components/delete-song/delete-song.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AddMusicComponent } from './components/add-music/add-music.component';
import { EditMusicComponent } from './components/edit-music/edit-music.component';
import { DeleteMusicComponent } from './components/delete-music/delete-music.component';



@NgModule({
  declarations: [InvalidCredentialsComponent,
    AddSongComponent, EditSongComponent,
    DeleteSongComponent, AddMusicComponent, EditMusicComponent, DeleteMusicComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NebularModule,
    FileModule,
    NgxModule,
    FlexLayoutModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    NebularModule,
    FileModule,
    NgxModule,
    FlexLayoutModule,
    ChartsModule,
    InvalidCredentialsComponent,
    AddSongComponent,
    EditSongComponent,
    DeleteSongComponent,
     AddMusicComponent, EditMusicComponent, DeleteMusicComponent
  ]
})
export class SharedModule { }
