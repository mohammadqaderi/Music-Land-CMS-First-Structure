import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../Shared/shared.module";
import {SingerRoutingModule} from "./singer-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AllSingersComponent} from "./all-singers/all-singers.component";
import {SingerDetailsComponent} from "./singer-details/singer-details.component";
import {PipesModule} from "../../../pipes/pipes.module";



@NgModule({
  declarations: [AllSingersComponent, SingerDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    SingerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class SingerModule { }
