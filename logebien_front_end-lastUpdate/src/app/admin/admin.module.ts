import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './layout/admin-header/admin-header.component';
import { AdminSideBarComponent } from './layout/admin-side-bar/admin-side-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminConsulterAnnonceComponent } from './admin-consulter-annonce/admin-consulter-annonce.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminSideBarComponent,
    DashboardComponent,
    AdminConsulterAnnonceComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
