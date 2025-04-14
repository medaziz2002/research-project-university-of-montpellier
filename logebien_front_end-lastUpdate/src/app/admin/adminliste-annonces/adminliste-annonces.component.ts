import { Component } from '@angular/core';
import { Annonce } from 'src/app/models/Annonce.model';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import { faEye,faArchive ,faCheck,faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-adminliste-annonces',
  templateUrl: './adminliste-annonces.component.html',
  styleUrls: ['./adminliste-annonces.component.css']
})
export class AdminlisteAnnoncesComponent {
  annonces:any;
  faEye = faEye;
  faArchive = faArchive;
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;
  cause :string="";
  currentPage:number=1;
  totalPages!: number;        // Total des pages disponibles
  searchTerm: string = '';
  constructor(private annonceService:AnnonceService){}
  allAnnonces: any[] = []; // copie originale


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAnnonces(this.currentPage);
}


getAnnonces(pageNumber: number): void {
  const params = new HttpParams()
    .set('page', pageNumber.toString())
    .set('nbAnnoncePerPage', '2');

  this.annonceService.getAnnonces(params).subscribe({
    next: (response) => {
      console.log("Réponse reçue :", response);
      this.annonces = response.annonces;
    
      this.totalPages = response.totalPages;
      this.allAnnonces = [...response.annonces];
      this.convertImages();
    },
    error: (error) => {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  });
}



convertImages() {
  for (let annonce of this.annonces) {
    if (annonce.imagesList && annonce.imagesList.length > 0) {
      annonce.photos = []; // une liste de toutes les images en base64

      for (let img of annonce.imagesList) {
        if (img.image && img.type) {
          let image = 'data:' + img.type + ';base64,' + img.image;
          annonce.photos.push(image);
        }
      }

      // Si tu veux juste une seule image à afficher en "miniature" par exemple
      annonce.photo = annonce.photos[0];
      console.log("Je suis dans la conversion d'image : " + annonce.photo);
      console.log("Tableau d'image : " + annonce.photos.length);
    }
  }
}





archiverAnnonce(id:number){
  Swal.fire({
    title: 'Etes vous sur de vouloir archiver cette annonce?',
    text: "Vous ne pourrez pas revenir en arrière!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',

    confirmButtonText: 'Oui, Archiver!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.annonceService.archiverannonce(id).subscribe(
        (data)=>{
          console.log(data);
          this.getAnnonces(this.currentPage);
        }
      )
      Swal.fire(
        'Archivé!',
        'Annonce archivée avec succés',
        'success'
      )
    }
  })
}

rendreAnnonceVisible(id:number){
  Swal.fire({
    title: 'Etes vous sur de vouloir rendre cette annonce visible?',
    text: "Vous ne pourrez pas revenir en arrière!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',

    confirmButtonText: 'Oui, Rendre visible!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.annonceService.rendreAnnonceVisible(id).subscribe(
        (data)=>{
          console.log(data);
          this.getAnnonces(this.currentPage);
        }
      )
      Swal.fire(
        'Visible!',
        'Annonce rendue visible avec succés',
        'success'
      )
    }
  })

}

accepterAnnonce(id:number){
  Swal.fire({
    title: 'Etes vous sur de vouloir accepter cette annonce?',
    text: "Vous ne pourrez pas revenir en arrière!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',

    confirmButtonText: 'Oui, Accepter!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.annonceService.accepterAnnonce(id).subscribe(
        (data)=>{
          console.log(data);
          this.getAnnonces(this.currentPage);
        }
      )
      Swal.fire(
        'Acceptée!',
        'Annonce acceptée avec succés',
        'success'
      )
    }
  })
}

refuserAnnonce(id:number){
  Swal.fire({
    title: 'pourquoi voulez vous refuser cette annonce?',
    text: "Vous ne pourrez pas revenir en arrière!",
    input: 'text',    

    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',

    confirmButtonText: 'Oui, Refuser!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.cause = result.value;
      this.annonceService.rejeterAnnonce(id,this.cause).subscribe(
        (data)=>{
          console.log(data);
          this.getAnnonces(this.currentPage);
        }
      )
      Swal.fire(
        'Refusée!',
        'Annonce refusée avec succés',
        'success'
      )
    }
  })
}
nextPage() {
  if (this.currentPage < this.totalPages) {  // Vérifier si la page suivante existe
    this.currentPage++;
    this.getAnnonces(this.currentPage);  // Récupérer les annonces de la page suivante
  }
}

// Méthode pour aller à la page précédente
previousPage() {
  if (this.currentPage > 1) {  // Vérifier si la page précédente existe
    this.currentPage--;
    this.getAnnonces(this.currentPage);  // Récupérer les annonces de la page précédente
  }

}



filterAnnonces() {
  const search = this.searchTerm.trim().toLowerCase();
  if (search === '') {
    this.annonces = [...this.allAnnonces];
  } else {
    this.annonces = this.allAnnonces.filter((annonce: any) => {
      return (
        annonce.titre?.toLowerCase().includes(search) ||
        annonce.pays?.toLowerCase().includes(search) ||
        annonce.gouvernorat?.toLowerCase().includes(search) ||
        annonce.ville?.toLowerCase().includes(search) ||
        annonce.rue?.toLowerCase().includes(search) ||
        annonce.status?.toLowerCase().includes(search) ||
        annonce.typeBien?.nom?.toLowerCase().includes(search)
      );
    });
  }
}


}
