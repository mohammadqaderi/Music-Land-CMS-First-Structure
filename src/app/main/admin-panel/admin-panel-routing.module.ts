import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {SystemUsersComponent} from "./system-users/system-users.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile', // admin-panel/profile
        component: ProfileComponent
      },
      {
        path: 'system-users', // admin-panel/system-users
        component: SystemUsersComponent
      },
      {
        path: 'settings', // admin-panel/settings
        component: SettingsComponent
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
export class AdminPanelRoutingModule { }
