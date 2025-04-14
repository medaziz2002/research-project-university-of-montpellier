import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import { ListeTypesDeBiensComponent } from './liste-types-de-biens/liste-types-de-biens.component';
import { AdminlisteAnnoncesComponent } from './adminliste-annonces/adminliste-annonces.component';
import { AdminConsulterAnnonceComponent } from './admin-consulter-annonce/admin-consulter-annonce.component';
import { ConsulterProfilComponent } from '../consulter-profil/consulter-profil.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {path:"utilisateurs",component:ListeUtilisateursComponent}  ,
      {path:"types-de-biens",component:ListeTypesDeBiensComponent}  ,
      {path:"annonces",component:AdminlisteAnnoncesComponent}  ,	
      {path:"voir-annonce/:id",component:AdminConsulterAnnonceComponent}, 
      {path:"consulter-profil",component:ConsulterProfilComponent},
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
