import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PaiementService } from '../services/paiement/paiement.service';
import { ContratInfosService } from '../services/paiement/contrat-infos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratLocationService } from '../services/contratLocation/contrat-location.service';
import { ContratLocation } from '../models/ContratLocation.model';

@Component({
  selector: 'app-consulter-paiement',
  templateUrl: './consulter-paiement.component.html',
  styleUrls: ['./consulter-paiement.component.css']
})
export class ConsulterPaiementComponent {
  idContrat!:any;
  qrCodeString: string = 'Your QR Code String Here';

  contratInfos:ContratLocation=new ContratLocation();
  @ViewChild('PrintTemplate')
  private PrintTemplateTpl!: TemplateRef<any>;

  // {
//  //   "date_debut": "2023-12-13T17:23:09.000Z",
//     "date_debut": new Date("2023-12-13").toLocaleDateString("en-US"),
//     "date_fin": new Date("2023-12-26").toLocaleDateString("en-US"),
//     "montant": 150,
//     "annonce": {
//         "id": 1,
//         "titre": "s+3",
//         "nbchambre": 1,
//         "nblits": 5,
//         "etat": "accepté",
//         "superficie": 120,
//         "status": "visible",
//         "prixHiver": 50,
//         "prixEte": 100,
//         "prixPrintemps": 65,
//         "prixAutomne": 55,
//         "pays": "tunisie",
//         "ville": "Mrezga",
//         "gouvernorat": "Nabeul",
//         "rue": "rue korba",
//         "code_postal": "8000",
//         "longitude": 0,
//         "latitude": 0,
//         "user_id": 1,
//         "type_bien_id": 3,
//       // typebien, image, photos, user
//         "typebien": {id: 3,nom: "Maison",description: "Maison"},
//         "image": "http://localhost:3000/images/1.jpg",
//         "photos": [],
//         "user": {id: 1,nom: "mohamed",prenom: "mohamed",email: "yassinebenjeddou5@gmail.com",password: "123456"
//        , google_id : "null",
//          numtel : "12345678",
//           role: "proprietaire"
//         }
//         }
       
//     }



  infoBySaisons!:any[];
 infoOfReservation:any[]=[{saison:"Hiver",prixUnit:0,nbJours:0,prixTotal:0,dates:[]},
{saison:"Printemps",prixUnit:0,nbJours:0,prixTotal:0,dates:[]},
{saison:"Ete",prixUnit:0,nbJours:0,prixTotal:0,dates:[]},
{saison:"Automne",prixUnit:0,nbJours:0,prixTotal:0,dates:[]}];
  constructor(private router:Router,
    private activatedRoute:ActivatedRoute,private contratService:ContratLocationService) { }


 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.idContrat=this.activatedRoute.snapshot.params['id'];
  //this.contratInfos=this.contratInfosService.getContratLocation();

  this.getContratById(this.idContrat);
  
 }

 getContratById(id:number){
  this.contratService.getContratById(id).subscribe(
    (response)=>{
      
      this.contratInfos=response;
    
      this.contratInfos.datedebut=new Date(this.contratInfos.datedebut);
      this.contratInfos.datefin=new Date(this.contratInfos.datefin);
      console.log(this.contratInfos);
      this.getInfosBySaisons();
    },
    (error)=>{
      console.log(error);
    }
  )
}


 getInfosBySaisons(){

let selectedDates: Date[] = [];
//make an array that contains the dates between 12/12/2023 and 12/20/2023

//calculate the number of days between the two dates
let nbJours = Math.round(Math.abs((this.contratInfos.datedebut.getTime() - this.contratInfos.datefin.getTime()) / (24 * 60 * 60 * 1000)))+1;
console.log("nb jours"+ nbJours);
for (let i = 0; i < nbJours; i++) {
  var date = new Date(this.contratInfos.datedebut);
  date.setDate(date.getDate() + i);
  selectedDates.push(date);
}
console.log(selectedDates);






//loop through the selected dates and calculate the price for each date and add it to the total price test on saison of the date
for (let date of selectedDates) {

 const mois = date.getMonth();
  if(mois == 11 || mois == 0 || mois == 1)
  {
    this.infoOfReservation[0].nbJours++;
    this.infoOfReservation[0].dates.push(date);
    this.infoOfReservation[0].prixUnit=this.contratInfos.annonce.prixHiver;
    this.infoOfReservation[0].prixTotal+=Number(this.contratInfos.annonce.prixHiver);
  }
  if (mois == 2 || mois == 3 || mois == 4){
    
    this.infoOfReservation[1].nbJours++;
    this.infoOfReservation[1].dates.push(date);
    this.infoOfReservation[1].prixUnit=this.contratInfos.annonce.prixPrintemps;
    this.infoOfReservation[1].prixTotal+=Number(this.contratInfos.annonce.prixPrintemps);
  }
  
  if (mois == 5 || mois == 6 || mois == 7){
   
    this.infoOfReservation[2].nbJours++;
    this.infoOfReservation[2].dates.push(date);
    this.infoOfReservation[2].prixUnit=this.contratInfos.annonce.prixEte;
    this.infoOfReservation[2].prixTotal+=Number(this.contratInfos.annonce.prixEte);
  }

  if (mois == 8 || mois == 9 || mois == 10){
   
    this.infoOfReservation[3].nbJours++;
    this.infoOfReservation[3].dates.push(date);
    this.infoOfReservation[3].prixUnit=this.contratInfos.annonce.prixAutomne;
    this.infoOfReservation[3].prixTotal+=Number(this.contratInfos.annonce.prixAutomne);
  }


}
console.log(this.infoOfReservation);

}



imprimerFacture(){
  window.print();
}
}
