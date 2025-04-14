import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ListeAnnoncesComponent } from './liste-annonces/liste-annonces.component';
import { AdminlisteAnnoncesComponent } from './admin/adminliste-annonces/adminliste-annonces.component';
import { ListeUtilisateursComponent } from './admin/liste-utilisateurs/liste-utilisateurs.component';
import { ListeTypesDeBiensComponent } from './admin/liste-types-de-biens/liste-types-de-biens.component';
import { AjouterAnnonceComponent } from './ajouter-annonce/ajouter-annonce.component';
import { ListeAnnoncesProprietaireComponent } from './liste-annonces-proprietaire/liste-annonces-proprietaire.component';
import { ModifierAnnonceComponent } from './modifier-annonce/modifier-annonce.component';
import { ConsulterProfilComponent } from './consulter-profil/consulter-profil.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminSideBarComponent } from './admin/layout/admin-side-bar/admin-side-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ConsulterAnnonceComponent } from './consulter-annonce/consulter-annonce.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PaiementComponent } from './paiement/paiement.component';
import { NgPrintModule } from 'ng-print';
import { NgxPrintModule } from 'ngx-print';
import { NgxPrinterModule } from 'ngx-printer';
import { PaiementSuccesComponent } from './paiement-succes/paiement-succes.component';
import { PaiementFailComponent } from './paiement-fail/paiement-fail.component';
import { ConsulterPaiementComponent } from './consulter-paiement/consulter-paiement.component';
import { QRCodeModule } from 'angularx-qrcode';
import { TestingComponent } from './testing/testing.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenInterceptor } from './services/tokenInterceptor/token.interceptor';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    ListeAnnoncesComponent,
    AdminlisteAnnoncesComponent,
    ListeUtilisateursComponent,
    ListeTypesDeBiensComponent,
    AjouterAnnonceComponent,
    ListeAnnoncesProprietaireComponent,
    ModifierAnnonceComponent,
    ConsulterProfilComponent,
    HeaderComponent,
    FooterComponent,
    
    
    
    NotFoundComponent,


                      ConsulterAnnonceComponent,
                      PaiementComponent,
                      PaiementSuccesComponent,
                      PaiementFailComponent,
                      ConsulterPaiementComponent,
                      TestingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    NgxPrinterModule.forRoot({printOpenWindow: true}),
    QRCodeModule,
    MatSnackBarModule,
    

    
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi : true},
    DatePipe
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
