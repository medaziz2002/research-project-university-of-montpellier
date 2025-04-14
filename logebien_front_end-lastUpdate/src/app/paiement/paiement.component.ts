import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementService } from '../services/paiement/paiement.service';
import { ReservationService } from '../services/reservation/reservation.service';
import Swal from 'sweetalert2';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent  {
  idReservation!: number;
  qrCodeString: string = 'Reservation ID: ';
  paymentCheckSubscription!: Subscription;
  
  // Données de la réservation
  dateDebut!: string;
  dateFin!: string;
  prixTotal!: number;
  montantPaye!: number;
  dateReservation!: string;
  statut!: string;
  locataireDto: any = {};

  constructor(
    private paiementService: PaiementService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService
  ) { }

  ngOnInit(): void {
    this.idReservation = this.activatedRoute.snapshot.params['id'];
    this.getReservationById(this.idReservation);
    this.qrCodeString += this.idReservation;
  }

  getReservationById(id: number) {
    this.reservationService.getReservationById(id).subscribe(
      (response) => {
        this.dateDebut = response.dateDebut;
        this.dateFin = response.dateFin;
        this.prixTotal = response.prixTotal;
        this.montantPaye = response.montantPaye;
        this.dateReservation = response.dateReservation;
        this.statut = response.statut;
        this.locataireDto = response.locataireDto;
      },
      (error) => {
        console.log(error);
        this.showError('Erreur lors du chargement de la réservation');
      }
    );
  }

  getNbNuits(): number {
    if (!this.dateDebut || !this.dateFin) return 0;
    
    const start = new Date(this.dateDebut);
    const end = new Date(this.dateFin);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  imprimerFacture() {
    window.print();
  }
  payer() {
    this.paiementService.generatePayment(this.prixTotal.toString(), this.idReservation).subscribe({
      next: (response) => {
        const paymentLink = response?.link;
  
        if (!paymentLink) {
          this.showError('Erreur de configuration du paiement');
          return;
        }
        
        window.open(paymentLink, '_blank') || (window.location.href = paymentLink);
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.showError('Erreur lors de la génération du paiement');
      }
    });
  }
  





  showError(message: string) {
    Swal.fire({
      title: 'Erreur',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }


}