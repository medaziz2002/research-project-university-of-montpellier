import { Component } from '@angular/core';
import { faMapMarkerAlt, faEdit, faFolder } from '@fortawesome/free-solid-svg-icons';
import { ScrollTopService } from '../services/scroll-top/scroll-top.service';
import { AnnonceService } from '../services/annonce/annonce.service';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/User.model';

@Component({
  selector: 'app-liste-annonces-proprietaire',
  templateUrl: './liste-annonces-proprietaire.component.html',
  styleUrls: ['./liste-annonces-proprietaire.component.css']
})
export class ListeAnnoncesProprietaireComponent {
  faMapMarkerAlt = faMapMarkerAlt;
  faEdit = faEdit;
  faFolder = faFolder;
  annonces: any[] = [];
  loggedUser: User = new User();

  constructor(
    private annonceService: AnnonceService,
    private scrollService: ScrollTopService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    await this.authService.setLoggedUser();
    this.loggedUser = this.authService.getLoggedUser();
    this.scrollService.scrollToTopOnNavigation();
    this.getAnnoncesByProprietaire();
  }

  getAnnoncesByProprietaire() {
    this.annonceService.getAnnonceByUserId(this.loggedUser.prop_id).subscribe(
      (response) => {
        this.annonces = response; // Modification ici car votre réponse semble être un tableau directement
        console.log('Annonces chargées:', this.annonces);
      },
      (error) => {
        console.error("Erreur lors du chargement des annonces:", error);
      }
    );
  }
}