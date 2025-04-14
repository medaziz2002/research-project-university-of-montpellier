import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paiement-fail',
  templateUrl: './paiement-fail.component.html',
  styleUrls: ['./paiement-fail.component.css']
})
export class PaiementFailComponent {
     idContrat!: number;
    constructor(private route:ActivatedRoute){}

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      
      this.idContrat=this.route.snapshot.params['idContrat'];
    }
}
