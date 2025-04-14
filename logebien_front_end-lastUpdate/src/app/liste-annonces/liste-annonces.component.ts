import { Component } from '@angular/core';
import { Annonce } from '../models/Annonce.model';
import { AnnonceService } from '../services/annonce/annonce.service';
import { ScrollTopService } from '../services/scroll-top/scroll-top.service';
import { faCompressArrowsAlt,faBed,faCouch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';
import { TypeService } from '../services/type/type.service';
@Component({
  selector: 'app-liste-annonces',
  templateUrl: './liste-annonces.component.html',
  styleUrls: ['./liste-annonces.component.css']
})
export class ListeAnnoncesComponent {

annonces : any;
faCompressArrowsAlt = faCompressArrowsAlt;
faBed = faBed;
faCouch = faCouch;
budgets : any[] = [[10,20],[20,40],[40,60],[60,80],[80,500],[500,1000]];
searchedValue: any = "";
searchedGouvernorat: any = "";
type_bien_id: any = "";

pages : Array<number> = [];
gouvernorats : string[]=[]
typesDeBien : any[]=[];
currentPage:number=1;
searchedTypeBien:any="";
searchedPrixMin:any="";
searchedPrixMax:any="";
constructor(private annonceService:AnnonceService,private scrollService: ScrollTopService,private typeBienService:TypeService){}
ngOnInit(): void {

  this.scrollService.scrollToTopOnNavigation();
  this.getAnnonces(1);
  this.getGouvernorats();
  this.getTypesDeBien();
}

setSearchedTypeBien(typeBien:any){
  console.log(typeBien.target.value);
  this.searchedTypeBien=typeBien.target.value;

}
setSearchedPrixMinAndMax(prix:any){
  console.log(prix.target.value);

  if (prix.target.value == "all") {
    console.log("all");
    this.searchedPrixMin = "",
    this.searchedPrixMax = ""
    return;
  }
  

  this.searchedPrixMin=this.budgets[prix.target.value][0];
  this.searchedPrixMax=this.budgets[prix.target.value][1];
  console.log(this.searchedPrixMin);
  console.log(this.searchedPrixMax);

}

getTypesDeBien(){
  this.typeBienService.getTypebien().subscribe(
    response=>{
      console.log(response);
      this.typesDeBien=response;
      console.log(this.typesDeBien);
    },
    (error)=>{
      console.log("erreur")
    }
  )
}

getGouvernorats(){
  this.annonceService.getGouvernorats().subscribe(
    (response)=>{
      console.log(Object.keys(response));
      this.gouvernorats=Object.keys(response);
    },
    (error)=>{
      console.log("erreur")
    }
  )
}




searchAnnonces(){
  console.log(this.searchedValue);
  console.log(this.searchedGouvernorat);
  console.log(this.searchedTypeBien);
  let params:HttpParams = new HttpParams();
  params = params.append('page','1');
  params = params.append('nbAnnoncePerPage','12');
  params = params.append('etat','accepté');
  params = params.append('status','visible');
  params = params.append('titre',this.searchedValue);
  params = params.append('gouvernorat',this.searchedGouvernorat);
  params = params.append('prixMin',this.searchedPrixMin);
  params = params.append('prixMax',this.searchedPrixMax);
  params = params.append('type_bien_id',this.searchedTypeBien);

 

  console.log("Les parametre est"+params);
  this.annonceService.getAnnonces(params).subscribe(
    (response)=>{
     console.log(response.annonces)
     this.annonces= response.annonces;
      this.setPages();
      this.convertImages();
    },
    (error)=>{
  console.log("erreur")
    }
  )
}

getAnnonces(pageNumber:number){
  let params:HttpParams = new HttpParams();
  params = params.append('page',pageNumber);
  params = params.append('nbAnnoncePerPage','12');
  params = params.append('etat','accepté');
  params = params.append('status','visible');
  
  this.annonceService.getAnnonces(params).subscribe(
    (response)=>{

     this.annonces= response.annonces;
     console.log("je suis dans la liste des annonces : " + this.annonces);
      this.setPages();
      this.convertImages();
    },
    (error)=>{
  console.log("erreur")
    }
  )
}




getPrixSaisonActuelle(annonce:Annonce):number{
  //if saison actuelle est hiver en consultant la date actuelle

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
  convertImages() {
    for (let annonce of this.annonces) {
      // Vérifier si imagesList existe et contient au moins une image
      if (annonce.imagesList && annonce.imagesList.length > 0) {
        // Prendre la première image (vous pouvez ajuster cela selon vos besoins)
        let image = annonce.imagesList[0];  // Si vous voulez juste la première image
        if (image && image.image) {
          // Créer la chaîne de l'image avec son type MIME
          let imageBase64 = 'data:' + image.type + ';base64,' + image.image;
          annonce.image = imageBase64;
          console.log("Je suis dans la conversion d'image : " + annonce.image);
        }
      }
    }
  }
  
  

  nextPage() {
    // Vérifiez si nous ne sommes pas déjà sur la dernière page
    if (this.currentPage < this.annonces.totalPages) {
      this.currentPage++;
      this.getAnnonces(this.currentPage);
    }
  }
  
  previousPage() {
    // Vérifiez si nous ne sommes pas déjà sur la première page
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAnnonces(this.currentPage);
    }
  }
  
  gotoPage(n: number) {
    if (n !== this.currentPage) {
      this.currentPage = n;
      this.getAnnonces(this.currentPage);
    }
  }
  
  setPages() {
    this.pages = [];
    // Utilisez 'totalPages' pour générer les numéros de pages
    for (let i = 1; i <= this.annonces.totalPages; i++) {
      this.pages.push(i);
    }
  }
  


}
