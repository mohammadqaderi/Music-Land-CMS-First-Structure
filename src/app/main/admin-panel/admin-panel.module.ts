import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "./profile/profile.component";
import {SystemUsersComponent} from "./system-users/system-users.component";
import {SettingsComponent} from "./settings/settings.component";
import {SharedModule} from "../../Shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminPanelRoutingModule} from "./admin-panel-routing.module";



@NgModule({
  declarations: [ProfileComponent, SystemUsersComponent, SettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPanelRoutingModule
  ]
})
export class AdminPanelModule { }
