import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TypeBien } from '../models/Type_bien.model';
import { AnnonceService } from '../services/annonce/annonce.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeService } from '../services/type/type.service';
import Swal from 'sweetalert2';
import { NonDisponibilitéService } from '../services/NonDisponibilité/non-disponibilité.service';
import { max } from 'rxjs';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-modifier-annonce',
  templateUrl: './modifier-annonce.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modifier-annonce.component.css']
})
export class ModifierAnnonceComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  faTrash = faTrash;
  FaImage =faImage;
  informationsForm!:FormGroup;
  selectedFiles : any[] = [];
  isDragging = false;
  images :File[]=[];
  annonce : any;
  types : TypeBien[] = [];
  minDate = new Date();   
  maxDate = new Date();
  erreur= "";
  loggedUser: User = new User;
   selectedStartDate!: Date;
   selectedEndDate!: Date;
   selectionStart = new Date();
   bsRangeValue!: Date[];
   disabledDates: Date[] = [];
  constructor(private annonceService:AnnonceService,private route:ActivatedRoute,private router:Router,private fb:FormBuilder,
    private typeService:TypeService,private nondispobiliteService:NonDisponibilitéService,private authService:AuthService) { }
    
  async  ngOnInit() {

    this.maxDate.setDate(this.maxDate.getDate() + 365);
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
     typeId: this.annonce?.type_bien_id,
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


 
 }


 onDateRangeChange(dateRange: any): void {
  // This method is called when the date range changes
  // You can update selectedStartDate and selectedEndDate here


  for(let date of this.disabledDates){
    if(dateRange[0]<date && dateRange[1] > date){
      console.log("vous ne pouvez pas selectionner toute cette période parce que la date "+date.toISOString().split('T')[0]
      +" est déjà"+this.erreur);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'vous ne pouvez pas selectionner toute cette période parce que la date '+date.toISOString().split('T')[0]+
        ' est déjà '+this.erreur,
        footer: '<a href>Why do I have this issue?</a>'
      })
      //delete the selected date range from the datepicker

      this.bsRangeValue = [];
      return;
    }
  }



 console.log(dateRange);

  this.selectedStartDate = dateRange[0]
  this.selectedEndDate = dateRange[1]

  console.log(this.selectedStartDate);
  console.log(this.selectedEndDate);
   

}



modifierAnnonce() {
  const annonceData = {
    titre: this.informationsForm.get('titre')?.value,
    id: this.annonce.id,
    nbchambre: this.informationsForm.get('nbchambre')?.value,
    nblits: this.informationsForm.get('nblits')?.value,
    superficie: this.informationsForm.get('superficie')?.value,
    pays: this.informationsForm.get('pays')?.value,
    type_bien_id: this.informationsForm.get('typeId')?.value,
    longitude: this.annonce.longitude,
    latitude: this.annonce.latitude,
    status: this.annonce.status,
    etat: this.annonce.etat,
    prop_id: this.annonce.prop_id,
    ville: this.informationsForm.get('ville')?.value,
    gouvernorat: this.informationsForm.get('gouvernorat')?.value,
    rue: this.informationsForm.get('rue')?.value,
    code_postal: this.informationsForm.get('code_postal')?.value,
    prixHiver: this.informationsForm.get('prixHiver')?.value,
    prixEte: this.informationsForm.get('prixEte')?.value,
    prixPrintemps: this.informationsForm.get('prixPrintemps')?.value,
    prixAutomne: this.informationsForm.get('prixAutomne')?.value,
  };

  const formData = new FormData();
  
  // Ajouter l'annonce
  formData.append('annonceDTO', new Blob([JSON.stringify(annonceData)], {
    type: 'application/json'
  }))

// Créer un Set pour garder trace des noms de fichiers déjà ajoutés
const addedFileNames = new Set<string>();
const allFiles: File[] = [];

// Cas 1: Ajouter les images de this.images
if (this.images && this.images.length > 0) {
  this.images.forEach((image) => {
    if (!addedFileNames.has(image.name)) {
      allFiles.push(image);
      addedFileNames.add(image.name);
    }
  });
}

// Cas 2: Traiter les selectedFiles
if (this.selectedFiles && this.selectedFiles.length > 0) {
  this.selectedFiles.forEach((image) => {
    let file: File | null = null;
    
    if (image instanceof File) {
      file = image;
    } else if (image.url && image.url.startsWith('data:')) {
      const blob = this.dataURLtoBlob(image.url);
      const fileName = image.name || 'image_' + Date.now() + '.png';
      file = new File([blob], fileName, { type: blob.type });
    }

    if (file && !addedFileNames.has(file.name)) {
      allFiles.push(file);
      addedFileNames.add(file.name);
    }
  });
}

// Ajouter tous les fichiers uniques au formData
allFiles.forEach((file) => {
  formData.append('pathImages', file, file.name);
});
  


  // Envoyer la requête
  this.annonceService.modifierAnnonce(this.annonce.id, formData).subscribe(
    (response) => {
      Swal.fire('Succès', 'Annonce modifiée avec succès', 'success');
      this.router.navigate(['/liste-annonces-prop']);
    },
    (error) => {
      console.error('Erreur:', error);
      Swal.fire('Erreur', 'Échec de la modification', 'error');
    }
  );
}

// Méthode pour convertir une URL base64 en Blob
dataURLtoBlob(dataurl: string): Blob {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
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
      

       
       for(let photo of this.annonce.imagesList){
        let image = 'data:png;base64,' + photo.image;
        photo.image = image;
        this.selectedFiles.push({ name: photo.id, url:photo.image });
        console.log(this.selectedFiles);
       }
        console.log(this.selectedFiles);


    } catch (error) {
      console.error('Error fetching annonce:', error);
    }
  }

convertImages(){
  for(let image of this.annonce.imagesList){
    image.image = 'data:png;base64,' + image.image;
  }
}


deleteImage(selectedFile: any): void {
  console.log('Deleting image:', selectedFile);

  // 1. Supprimer de imagesList (images existantes) si c'est une image existante (avec id)
  if (selectedFile.name) { // Si c'est une image existante (elle a un name qui correspond à l'id)
    const photoIndex = this.annonce.imagesList.findIndex((photo: any) => photo.id === selectedFile.name);
    if (photoIndex !== -1) {
      this.annonce.imagesList.splice(photoIndex, 1);
    }
  }

  // 2. Supprimer de selectedFiles (prévisualisation)
  const selectedFileIndex = this.selectedFiles.findIndex(file => 
    file === selectedFile || file.name === selectedFile.name
  );
  if (selectedFileIndex !== -1) {
    this.selectedFiles.splice(selectedFileIndex, 1);
  }

  // 3. Supprimer de images (fichiers à uploader) si c'est un nouveau fichier
  if (selectedFile instanceof File || selectedFile.name) {
    const imageIndex = this.images.findIndex(img => 
      img === selectedFile || img.name === selectedFile.name
    );
    if (imageIndex !== -1) {
      this.images.splice(imageIndex, 1);
    }
  }
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
openFileExplorer(): void {
  // Trigger the file input click event to open the file explorer
  this.fileInput.nativeElement.click();
}









}
