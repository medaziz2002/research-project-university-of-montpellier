import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { faTrash,faImage} from '@fortawesome/free-solid-svg-icons';
import { TypeService } from '../services/type/type.service';
import { AnnonceService } from '../services/annonce/annonce.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeBien } from '../models/Type_bien.model';
import { Photo } from '../models/Photo.model';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/User.model';

@Component({
  selector: 'app-ajouter-annonce',
  templateUrl: './ajouter-annonce.component.html',
  
  styleUrls: ['./ajouter-annonce.component.css']
})
export class AjouterAnnonceComponent {
  faTrash = faTrash;
  FaImage =faImage;
step = 0;

isDragging = false;
types :any[]=[];
selectedFiles : any[] = [];
images :File[]=[];
typeSeletionne:TypeBien = new TypeBien();
@ViewChild('fileInput') fileInput!: ElementRef;
informationsForm!:FormGroup;
addressForm!:FormGroup;
pricingForm!:FormGroup;
typeForm!:FormGroup;
gouvernorats : string[]=[]
gouvernoratAndVilles : any[] = [];
villes : any[] = [];
loggedUser: User = new User;
constructor(private typeService:TypeService,private annonceService:AnnonceService,private router:Router,private fb:FormBuilder,private authService:AuthService) { }


openFileExplorer(): void {
  // Trigger the file input click event to open the file explorer
  this.fileInput.nativeElement.click();
}
setStep(index: number) {
  this.step = index;
}


async  ngOnInit() {
  await this.authService.setLoggedUser();
  this.loggedUser= this.authService.getLoggedUser();
  this.getGouvernoratsAndVilles();
  this.step = 3;
  this.getTypes();

  this.informationsForm = this.fb.group({
    titre: ['', Validators.required],
    nbchambre: [1, Validators.min(1)],
    nblits: ['', Validators.required],
    superficie: ['', Validators.required],
  });

  this.addressForm = this.fb.group({

    pays: ['Tunisie', Validators.required],
    ville: ['', Validators.required],
    gouvernorat: ['', Validators.required],
    rue: ['', Validators.required],
    code_postal: ['', Validators.required],
    // longitude: ['', Validators.required],
    // latitude: ['', Validators.required],

  });

  this.pricingForm = this.fb.group({

    prixHiver: ['', Validators.required],
    prixEte: ['', Validators.required],
    prixPrintemps: ['', Validators.required],
    prixAutomne: ['', Validators.required],
  });

  this.typeForm = this.fb.group({

    typeId: ['', Validators.required],
  });
console.log(this.typeForm.valid)  ;
}

getGouvernoratsAndVilles(){
  this.annonceService.getGouvernorats().subscribe(
    (response)=>{
      console.log(response);
      this.gouvernoratAndVilles = response;
      this.gouvernorats = Object.keys(response);
      console.log(this.gouvernorats);
      console.log(this.gouvernoratAndVilles);
    },
    (error)=>{
      console.log(error);
    }
  )
}

getVillesOfSelectedGouvernorat(gouvernorat : any){
  console.log(gouvernorat.target.value);


  this.villes = this.gouvernoratAndVilles[gouvernorat.target.value];
  
 // this.villes = this.villes.filter((ville,index,self)=>self.findIndex((t)=>{return t.delegation === ville.delegation})===index);

 //villes = only  delegation = localite
 let villess :any []=[];
  this.villes.forEach((ville)=>{
    if (ville.delegation === ville.localite){
     villess.push(ville);
    }
  }
  )

  this.villes = villess;


 
 console.log(this.villes);




}

setCodePostal(ville : any){
  //search for the ville in the villes
  console.log(ville.target.value);
  let villeSelected = this.villes.find(v=>v.localite === ville.target.value);
  console.log(villeSelected);
  console.log(villeSelected?.cp);
  this.addressForm.get('code_postal')?.setValue(villeSelected?.cp);
  console.log(this.addressForm.get('code_postal')?.value);
}




selectType(type :TypeBien){
  console.log(type)
  this.typeSeletionne=type;
  this.typeForm.get('typeId')?.setValue(type.id)
  console.log(this.typeForm.valid)  ;
  

}


getTypes(){
  this.typeService.getTypebien().subscribe(
    (response)=>{
      console.log(response)
      this.types=response
      this.convertImages();
    },
    (error)=>{
      console.log(error)
    }
  )
}
convertImages() {
  for (let type of this.types) {
    if (type.imageDto && type.imageDto.image) {
      console.log("Je suis dans la conversion d'image : " + type.imageDto.image);
      let image = 'data:' + type.imageDto.type + ';base64,' + type.imageDto.image;
      type.photo = image; // ou tu peux remplacer imageDto si tu veux l'afficher dans le HTML
    }
  }
}

ajouterAnnonce() {
  // 1. Créer l'objet JSON
  const annonceData = {
    titre: this.informationsForm.get('titre')?.value,
    nbchambre: this.informationsForm.get('nbchambre')?.value,
    nblits: this.informationsForm.get('nblits')?.value,
    superficie: this.informationsForm.get('superficie')?.value,
    pays: this.addressForm.get('pays')?.value,
    type_bien_id: this.typeForm.get('typeId')?.value,
    longitude: '0',
    latitude: '0',
    status: 'visible',
    etat: 'en attente',
    prop_id:this.loggedUser.prop_id,
    ville: this.addressForm.get('ville')?.value,
    gouvernorat: this.addressForm.get('gouvernorat')?.value,
    rue: this.addressForm.get('rue')?.value,
    code_postal: this.addressForm.get('code_postal')?.value,
    prixHiver: this.pricingForm.get('prixHiver')?.value,
    prixEte: this.pricingForm.get('prixEte')?.value,
    prixPrintemps: this.pricingForm.get('prixPrintemps')?.value,
    prixAutomne: this.pricingForm.get('prixAutomne')?.value,
    namepricipale: this.images[0]?.name
  };

  // 2. Créer FormData
  const formData = new FormData();
  
  // Ajouter le JSON sous le nom 'annonceDTO'
  formData.append('annonceDTO', new Blob([JSON.stringify(annonceData)], {
    type: 'application/json'
  }));

  // Ajouter les images sous le nom 'pathImages'
  this.images.forEach((image, index) => {
    formData.append('pathImages', image, image.name);
  });

  // 3. Envoyer au service
  this.annonceService.addAnnonce(formData).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Annonce ajoutée avec succès',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/liste-annonces-prop']);
    },
    (error) => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.message || "Erreur lors de l'ajout de l'annonce",
        showConfirmButton: true
      });
    }
  );
}


verifNbImages(){
  if(this.images.length<5){
    return true;
  }
  return false;
}

onFileSelected(event: any): void {
  const selectedFiles: FileList = event.target.files;

  // Handle the selected files
  for (let i = 0; i < selectedFiles.length; i++) {
    const file: File = selectedFiles[i];

    // Assuming you have a method to generate a URL for the file (e.g., using FileReader)
    this.generateFileUrl(file).then((url: string) => {
      // Update the selectedFiles array with the new file information
      this.selectedFiles.push({ name: file.name, url });
      console.log(this.selectedFiles)
      let  photo:File = new File([file],file.name,{type:file.type})
      this.images.push(photo)
      console.log(this.images)
    
    });
  }
}




generateFileUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();


    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
onDragOver(event: DragEvent): void {
  event.preventDefault();
  this.isDragging = true;
}

onDragLeave(event: DragEvent): void {
  event.preventDefault();
  this.isDragging = false;
}

onDrop(event: DragEvent): void {
  event.preventDefault();
  this.isDragging = false;

  const files = event.dataTransfer?.files;
  if (files) {
    this.handleSelectedFiles(files);
  }
}
private handleSelectedFiles(files: FileList): void {
  // Handle the selected files
  for (let i = 0; i < files.length; i++) {
    const file: File = files[i];

    // Assuming you have a method to generate a URL for the file (e.g., using FileReader)
    this.generateFileUrl(file).then((url: string) => {
      // Update the selectedFiles array with the new file information
      this.selectedFiles.push({ name: file.name, url });
     let  photo:File = new File([file],file.name,{type:file.type})
      this.images.push(photo)
      console.log(this.images)
    });
  }
}

deleteImage(index: number): void {
  // Remove the image from the array based on the index
  this.selectedFiles.splice(index, 1);
}

}
