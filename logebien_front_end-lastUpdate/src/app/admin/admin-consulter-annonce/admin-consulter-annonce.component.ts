import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faImage,faTrash,faCheck ,faTimesCircle,faEye,faArchive} from '@fortawesome/free-solid-svg-icons';
import { Annonce } from 'src/app/models/Annonce.model';
import { TypeBien } from 'src/app/models/Type_bien.model';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import { TypeService } from 'src/app/services/type/type.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-consulter-annonce',
  templateUrl: './admin-consulter-annonce.component.html',
  styleUrls: ['./admin-consulter-annonce.component.css']
})
export class AdminConsulterAnnonceComponent {

  faImage = faImage;
  faTrash = faTrash;
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;
  faEye = faEye;
  faArchive = faArchive;
  cause :string="";
  informationsForm!:FormGroup;
  causeForm!:FormGroup;
  annonce : any;
  types : TypeBien[] = [];
  constructor(private annonceService:AnnonceService,private route:ActivatedRoute,private router:Router,private fb:FormBuilder,
    private typeService:TypeService) { }

 async  ngOnInit() {
     this.route.params.subscribe(
     async (params)=>{
        console.log(params['id']);
     await   this.getAnnonce(params['id']);
      this.convertImages();
     await this.getTypes();
     console.log(this.annonce);
     this.informationsForm.patchValue({
      titre: this.annonce?.titre,
      nbchambre: this.annonce?.nbchambre,
      nblits: this.annonce?.nblits,
      superficie: this.annonce?.superficie,
      pays: this.annonce?.pays,
      ville: this.annonce?.ville,
      gouvernorat: this.annonce?.gouvernorat,
      rue: this.annonce?.rue,
      code_postal: this.annonce?.code_postal,
    
      prixHiver: this.annonce?.prixHiver,
      prixEte: this.annonce?.prixEte,
      prixPrintemps: this.annonce?.prixPrintemps,
      prixAutomne: this.annonce?.prixAutomne,
      typeId: this.annonce?.typeBien?.id,
    });
console.log(this.informationsForm.value);
      }
    )
   
    this.informationsForm = this.fb.group({
      titre: ['', Validators.required],
      nbchambre: [1, Validators.min(1)],
      nblits: ['', Validators.required],
      superficie: ['', Validators.required],
  
  
  
  
      pays: ['', Validators.required],
      ville: ['', Validators.required],
      gouvernorat: ['', Validators.required],
      rue: ['', Validators.required],
      code_postal: ['', Validators.required],
   
  
  
  
  
      prixHiver: ['', Validators.required],
      prixEte: ['', Validators.required],
      prixPrintemps: ['', Validators.required],
      prixAutomne: ['', Validators.required],
  
  

  
      typeId: ['', Validators.required],
    });
  this.causeForm = this.fb.group({
    cause: ['', Validators.required],
  });
  
  }
async getTypes(){
  try {
    const data = await this.typeService.getTypebien().toPromise();
    console.log(data);
    this.types = data;
  } catch (error) {
    console.error('Error fetching annonce:', error);
  }

}

  async getAnnonce(id: number) {
    try {
      const data = await this.annonceService.getAnnonceById(id).toPromise();
      
      this.annonce = data;
      console.log(this.annonce);
      



    } catch (error) {
      console.error('Error fetching annonce:', error);
    }
  }

  convertImages() {
    if (this.annonce.imagesList && this.annonce.imagesList.length > 0) {
      this.annonce.photos = []; // Une liste de toutes les images au format base64
  
      for (let img of this.annonce.imagesList) {
        if (img.image && img.type) {
          let imageBase64 = 'data:' + img.type + ';base64,' + img.image;
          this.annonce.photos.push(imageBase64);
        }
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
            this.getAnnonce(id);
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
            this.getAnnonce(id);
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
            this.getAnnonce(id);
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
      // html:'<form [formGroup]="{{causeForm}}"><input type="text" name="cause"  placeholder="Cause du refus"'
      // +' formcontrolname="cause" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></form>',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputPlaceholder: 'Cause du refus',

  
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
  
      confirmButtonText: 'Oui, Refuser!'
    }).then((result) => {
   //   display the input value
      this.cause = result.value;
      console.log(this.cause);
      
      if (result.isConfirmed) {
        this.annonceService.rejeterAnnonce(id,this.cause).subscribe(
          (data)=>{
            console.log(data);
            this.getAnnonce(id);
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
}
