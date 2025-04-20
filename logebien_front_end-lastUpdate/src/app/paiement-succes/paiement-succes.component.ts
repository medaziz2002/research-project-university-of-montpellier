import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementService } from '../services/paiement/paiement.service';


@Component({
  selector: 'app-paiement-succes',
  templateUrl: './paiement-succes.component.html',
  styleUrls: ['./paiement-succes.component.css']
})
export class PaiementSuccesComponent implements OnInit {
  showSuccess = false;
  idContrat!: string | null;
  constructor(
    private route: ActivatedRoute,
    private paiementService: PaiementService,
    private router: Router
  ) {}

// paiement-succes.component.ts
ngOnInit(): void {
  const paymentId = this.route.snapshot.queryParamMap.get('paymentId');
  const payerId = this.route.snapshot.queryParamMap.get('PayerID');
  this.idContrat = this.route.snapshot.paramMap.get('idContrat');

  if (paymentId && payerId && this.idContrat) {
      this.paiementService.confirmerPaiement(paymentId, payerId, +this.idContrat)
          .subscribe({
              next: () => {
                  this.showSuccess = true;
              },
              error: (err) => {
                  console.error('Erreur lors de la confirmation:', err);
              }
          });
  }
}
  
}
