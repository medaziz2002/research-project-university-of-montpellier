import { Component } from '@angular/core';
import { AnnonceService } from '../services/annonce/annonce.service';
import { ScrollTopService } from '../services/scroll-top/scroll-top.service';
import { Annonce } from '../models/Annonce.model';
import { faCompressArrowsAlt,faBed,faCouch } from '@fortawesome/free-solid-svg-icons';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
 
  annonces : any;
  faCompressArrowsAlt = faCompressArrowsAlt;
  faBed = faBed;
  faCouch = faCouch;
  

 constructor(private annonceService:AnnonceService,private scrollService: ScrollTopService) { }

ngOnInit(): void {

  this.scrollService.scrollToTopOnNavigation();
  this.get4LastAnnonces();
  
}

 get4LastAnnonces(){
  let params:HttpParams = new HttpParams();

  params = params.append('etat','accepté');
  params = params.append('status','visible');
    this.annonceService.getLast4Annonces(params).subscribe(
      next=>{
        console.log(next);
        this.annonces = next;
        this.convertImages();
        console.log(this.annonces);
      }
    )
 }

 convertImages() {

  for (let annonce of this.annonces) {
    if (annonce.imagesList && annonce.imagesList.length > 0) {
      const firstImage = annonce.imagesList[0];
      if (firstImage.image && firstImage.type) {
        annonce.image = 'data:' + firstImage.type + ';base64,' + firstImage.image;
      }
    } 
  }
}


 getPrixSaisonActuelle(annonce:Annonce):number{

  const date = new Date();
  const mois = date.getMonth();
  if(mois == 11 || mois == 0 || mois == 1){
    return annonce.prixHiver}
  if (mois == 2 || mois == 3 || mois == 4){
    return annonce.prixPrintemps;
  }
  
  if (mois == 5 || mois == 6 || mois == 7){
    return annonce.prixEte;
  }

  if (mois == 8 || mois == 9 || mois == 10){
    return annonce.prixAutomne;
  }

 return 0;

  }
}
