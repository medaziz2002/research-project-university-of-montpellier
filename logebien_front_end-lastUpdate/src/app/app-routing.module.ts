import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { ListeAnnoncesComponent } from './liste-annonces/liste-annonces.component';
import { AjouterAnnonceComponent } from './ajouter-annonce/ajouter-annonce.component';
import { ModifierAnnonceComponent } from './modifier-annonce/modifier-annonce.component';

import { ListeAnnoncesProprietaireComponent } from './liste-annonces-proprietaire/liste-annonces-proprietaire.component';
import { ConsulterAnnonceComponent } from './consulter-annonce/consulter-annonce.component';
import { ConsulterProfilComponent } from './consulter-profil/consulter-profil.component';
import { PaiementComponent } from './paiement/paiement.component';
import { PaiementSuccesComponent } from './paiement-succes/paiement-succes.component';
import { PaiementFailComponent } from './paiement-fail/paiement-fail.component';
import { ConsulterPaiementComponent } from './consulter-paiement/consulter-paiement.component';
import { TestingComponent } from './testing/testing.component';

const routes: Routes = [
  {path :"login", component: LoginComponent},
  {path :"home", component: WelcomeComponent},
  {path :"register", component: RegisterComponent},
  {path :"liste-annonces", component:ListeAnnoncesComponent},
  {path:"ajouter-annonce",component:AjouterAnnonceComponent},
  {path:"modifier-annonce/:id",component:ModifierAnnonceComponent},
  {path: "liste-annonces-prop", component: ListeAnnoncesProprietaireComponent},
  {path:"consulter-annonce/:id",component:ConsulterAnnonceComponent},
  {path:"consulter-profil",component:ConsulterProfilComponent},
  {path: "paiement/:id", component: PaiementComponent},
  {path: "consulterpaiement/:id", component: ConsulterPaiementComponent},
  {path:"success/:idContrat",component:PaiementSuccesComponent},
  {path:"fail/:idContrat",component:PaiementFailComponent},
  {path:"admin", loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path : "**", redirectTo: "/home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 



}
