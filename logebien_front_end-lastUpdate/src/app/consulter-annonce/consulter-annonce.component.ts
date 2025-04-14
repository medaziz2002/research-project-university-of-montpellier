import { Component, ViewEncapsulation } from '@angular/core';
import { faCompressArrowsAlt, faBed, faCouch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Annonce } from '../models/Annonce.model';
import { AnnonceService } from '../services/annonce/annonce.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementService } from '../services/paiement/paiement.service';
import { ContratInfosService } from '../services/paiement/contrat-infos.service';
import { ContratLocation } from '../models/ContratLocation.model';
import { ContratLocationService } from '../services/contratLocation/contrat-location.service';
import Swal from 'sweetalert2';
import { NonDisponibilitéService } from '../services/NonDisponibilité/non-disponibilité.service';
import { Evaluation } from '../models/Evaluation.model';
import { EvaluationService } from '../services/evaluation/evaluation.service';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/User.model';
import { ReservationService } from '../services/reservation/reservation.service';

@Component({
  selector: 'app-consulter-annonce',
  templateUrl: './consulter-annonce.component.html',
  styleUrls: ['./consulter-annonce.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsulterAnnonceComponent {
  faCompressArrowsAlt = faCompressArrowsAlt;
  faBed = faBed;
  faCouch = faCouch;
  faMapMarkerAlt = faMapMarkerAlt;
  title = 'myangularproject';
  clickedItem!: string;
  bsValue = new Date();
  bsRangeValue!: Date[];
  maxDate = new Date();
  totalPrice = 0;
  nbJours = 0;
  contrats: ContratLocation[] = [];
  minDate = new Date();
  selectedStartDate!: Date;
  selectedEndDate!: Date;
  selectionStart = new Date();
  annonce: any;
  reclamation: Evaluation = new Evaluation();
  evaluation: Evaluation = new Evaluation();
  evaluations: Evaluation[] = [];
  MoyenneNoteEvaluationByAnnonce: number = 0;
  noteSelected = false;
  loggedUser: User = new User();
  reclamModal = false;
  reservationDetails: any = null; // Pour stocker les détails de la réservation

  //disable 8 decembre 2023 et 9 decembre 2023
  disabledDates = [new Date('2023-12-15'), new Date('2023-12-16')];

  constructor(
    private annonceService: AnnonceService,
    private route: ActivatedRoute,
    private paiementService: PaiementService,
    private router: Router,
    private contratInfosService: ContratInfosService,
    private contratService: ContratLocationService,
    private reservationService: ReservationService,
    private nondispobiliteService: NonDisponibilitéService,
    private evaluationService: EvaluationService,
    public authService: AuthService
  ) {
    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  async ngOnInit() {
    await this.authService.setLoggedUser();
    this.loggedUser = this.authService.getLoggedUser();
    this.evaluation.note = 0;
    this.minDate.setDate(this.minDate.getDate() + 2);
    this.getAnnonce();
    //this.getEvaluationByAnnonce();
    //this.getMoyenneNoteEvaluationByAnnonce();
    
    // Simuler des données de réservation (à remplacer par votre appel API réel)
    this.loadReservationDetails();
  }

  loadReservationDetails() {
    // Ici, vous devriez faire un appel API pour récupérer les détails de la réservation
    // Pour l'exemple, nous utilisons les données que vous avez fournies
    this.reservationDetails = {
      "idReservation": 5,
      "idLocataire": "5a9de144-a87c-46c1-abde-a4aca65f3e1d",
      "dateDebut": "2025-04-21",
      "dateFin": "2025-04-24",
      "prixTotal": 480.0,
      "montantPaye": 0.0,
      "dateReservation": "2025-04-14T11:14:17.686",
      "statut": "EnAttente",
      "locataireDto": {
        "id": null,
        "nom": "Mtar",
        "prenom": "rami",
        "email": null,
        "etat": false,
        "password": null,
        "prop_id": null,
        "loc_id": null,
        "imageId": null,
        "motdepasseId": null,
        "dateNaissance": null,
        "role": null
      }
    };
  }

  getNonDisponibiliteByAnnonceId() {
    this.nondispobiliteService.getNonDisponibilitéByAnnonceId(this.annonce.id).subscribe(
      (response) => {
        console.log(response);
        for (let nonDispo of response) {
          console.log(nonDispo);

          let datedebut = new Date(nonDispo.date_debut);
          let datefin = new Date(nonDispo.date_fin);
          console.log(datedebut);
          console.log(datefin);

          let nbjours = Math.round(Math.abs((datefin.getTime() - datedebut.getTime()) / (24 * 60 * 60 * 1000))) + 1;
          console.log(nbjours);
          for (let i = 0; i < nbjours; i++) {
            var date = new Date(datedebut);
            date.setDate(date.getDate() + i);
            this.disabledDates.push(date);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getContratByIdAnnonce() {
    this.contratService.GetcontratByAnnonce(this.annonce.id).subscribe(
      (response) => {
        console.log(response);
        this.contrats = response;
        console.log(this.contrats);
        for (let contrat of this.contrats) {
          console.log("contrat");
          console.log(contrat);
          console.log(contrat.datedebut);
          console.log(contrat.datefin);
          console.log(this.disabledDates);
          contrat.datedebut = new Date(contrat.datedebut);
          contrat.datefin = new Date(contrat.datefin);

          let nbjours = Math.round(Math.abs((contrat.datefin.getTime() - contrat.datedebut.getTime()) / (24 * 60 * 60 * 1000))) + 1;
          console.log(nbjours);
          for (let i = 0; i < nbjours; i++) {
            var date = new Date(contrat.datedebut);
            date.setDate(date.getDate() + i);
            this.disabledDates.push(date);
          }

          console.log(this.disabledDates);
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  Reserver() {
    const amount: number = this.totalPrice * 1000;
    const ReservationData = {
      idLocataire: this.loggedUser.loc_id,
      dateDebut: this.selectedStartDate.toISOString().split('T')[0],  // format YYYY-MM-DD
      dateFin: this.selectedEndDate.toISOString().split('T')[0],
      prixTotal: this.totalPrice,
      status: 'EnAttente',
      montantPaye: 0
    };

    this.reservationService.addReservation(ReservationData).subscribe(
      (response) => {
        // Redirection vers la page de paiement avec l'ID de la réservation
        const reservationId = response;  // Assurez-vous que 'id' est bien retourné dans la réponse
        this.router.navigate([`/paiement/${reservationId}`]);
      },
      (error) => {
        console.error("Erreur lors de la réservation :", error);
      }
    );
  }

  onDateRangeChange(dateRange: any): void {
    for (let date of this.disabledDates) {
      if (dateRange[0] < date && dateRange[1] > date) {
        console.log("vous ne pouvez pas réserver toute cette période parce que la date " + date.toISOString().split('T')[0]
          + " est indisponible");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'vous ne pouvez pas réserver toute cette période parce que la date ' + date.toISOString().split('T')[0] +
            ' est indisponible',
          footer: '<a href>Why do I have this issue?</a>'
        })
        this.bsRangeValue = [];
        return;
      }
    }

    console.log(dateRange);
    this.totalPrice = 0;
    this.nbJours = 0;
    this.selectedStartDate = dateRange[0]
    this.selectedEndDate = dateRange[1]

    console.log(this.selectedStartDate);
    console.log(this.selectedEndDate);

    this.calculatePrice(this.selectedStartDate, this.selectedEndDate);
  }

  calculatePrice(selectedStartDate: Date, selectedEndDate: Date): void {
    let selectedDates: Date[] = [];
    this.nbJours = Math.round(Math.abs((selectedEndDate.getTime() - selectedStartDate.getTime()) / (24 * 60 * 60 * 1000)) + 1);
    console.log("nb jours" + this.nbJours);
    for (let i = 0; i < this.nbJours; i++) {
      var date = new Date(this.selectedStartDate);
      date.setDate(date.getDate() + i);
      selectedDates.push(date);
    }
    console.log(selectedDates);

    for (let date of selectedDates) {
      const mois = date.getMonth();
      if (mois == 11 || mois == 0 || mois == 1) {
        this.totalPrice += Number(this.annonce?.prixHiver)
      }
      if (mois == 2 || mois == 3 || mois == 4) {
        this.totalPrice += Number(this.annonce?.prixPrintemps);
      }

      if (mois == 5 || mois == 6 || mois == 7) {
        this.totalPrice += Number(this.annonce?.prixEte);
      }

      if (mois == 8 || mois == 9 || mois == 10) {
        this.totalPrice += Number(this.annonce?.prixAutomne);
      }
    }
  }

  convertImages() {
    if (this.annonce?.imagesList && this.annonce?.imagesList.length > 0) {
      this.annonce.photos = []; // Initialiser le tableau photos
      for (let image of this.annonce.imagesList) {
        if (image.image) {
          let imageBase64 = 'data:' + image.type + ';base64,' + image.image;
          this.annonce.photos.push({ image: imageBase64 });
        }
      }
    }
  }

  clicked(item: string) {
    console.log("clicked");
    this.clickedItem = item;
  }

  getAnnonce() {
    this.annonceService.getAnnonceById(this.route.snapshot.params['id']).subscribe(
      (response) => {
        this.annonce = response;
        this.convertImages();
        //  this.getContratByIdAnnonce();
        //  this.getNonDisponibiliteByAnnonceId();
        if (!this.annonce.photos) {
          this.annonce.photos = [];
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPrixSaisonActuelle(annonce: Annonce): number {
    const date = new Date();
    const mois = date.getMonth();
    if (mois == 11 || mois == 0 || mois == 1) {
      return annonce?.prixHiver
    }
    if (mois == 2 || mois == 3 || mois == 4) {
      return annonce?.prixPrintemps;
    }

    if (mois == 5 || mois == 6 || mois == 7) {
      return annonce?.prixEte;
    }

    if (mois == 8 || mois == 9 || mois == 10) {
      return annonce?.prixAutomne;
    }

    return 0;
  }

  mouseenter(num: number) {
    console.log("mouse enter" + num);
    this.noteSelected = false;
    this.evaluation.note = num;
  }

  mouseleave(num: number) {
    console.log("mouse leave" + num);
    if (!this.noteSelected)
      this.evaluation.note = 0;
  }

  toggleReclamModal() {
    this.reclamModal = !this.reclamModal;
  }

  openReclamModal() {
    this.reclamModal = true;
  }
}