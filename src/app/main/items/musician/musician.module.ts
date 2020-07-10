import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMusiciansComponent } from './all-musicians/all-musicians.component';
import { MusicianDetailsComponent } from './musician-details/musician-details.component';
import {SharedModule} from "../../../Shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../../pipes/pipes.module";
import {MusicianRoutingModule} from "./musician-routing.module";



@NgModule({
  declarations: [AllMusiciansComponent, MusicianDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MusicianRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class MusicianModule { }
