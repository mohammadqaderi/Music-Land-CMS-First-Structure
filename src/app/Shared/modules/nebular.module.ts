import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbSpinnerModule, NbToastrModule} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbToastrModule.forRoot(),
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbSpinnerModule
  ],
  exports: [
    NbLayoutModule,
    NbEvaIconsModule,
    NbToastrModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbSpinnerModule
  ]
})
export class NebularModule { }
