import {NgModule} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotificationComponent} from './notification/notification.component';
import {SharedModule} from "../../../../Shared/shared.module";
import {RouterModule} from "@angular/router";
import {AdminLayoutRoutes} from "./admin-layout.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [DashboardComponent, NotificationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ReactiveFormsModule,
    FormsModule,
    NgbDropdownModule
  ],
  providers: [AsyncPipe]
})
export class AdminLayoutModule {
}
