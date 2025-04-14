import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeService } from 'src/app/services/type/type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-types-de-biens',
  templateUrl: './liste-types-de-biens.component.html',
  styleUrls: ['./liste-types-de-biens.component.css']
})
export class ListeTypesDeBiensComponent {
  action: string = '';
  button: string = '';
  myForm!: FormGroup;
  types: any[] = [];
  selectedType: any;
  uploadedImage!: File;
  typeBien!: any;
  imagePath: any = null;
  isModalVisible: boolean = false;

  constructor(private formBuilder: FormBuilder, private typeService: TypeService) {}

  ngOnInit(): void {
    this.getTypes();
    this.initializeForm();
  }

  initializeForm(): void {
    this.myForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: [''],
    });
  }

  setAction(action: string, button: string, type: any = null): void {
    this.action = action;
    this.button = button;
    this.selectedType = type;
    
    // Reset modal state
    this.closeModal();
    
    setTimeout(() => {
      this.isModalVisible = true;
      
      if (button === "Ajouter") {
        this.resetForm();
      } else if (button === "Modifier" && type) {
        this.patchFormValues(type);
      }
    }, 10);
  }

  patchFormValues(type: any): void {
    this.myForm.patchValue({
      nom: type.nom,
      description: type.description,
    });
  
    if (type.imageDto && type.imageDto.image && type.imageDto.type) {
      this.imagePath = 'data:' + type.imageDto.type + ';base64,' + type.imageDto.image;
    } else {
      this.imagePath = null;
    }
  }

  resetForm(): void {
    this.myForm.reset();
    this.imagePath = null;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  addOrUpdateTypeDeBien(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const typeBienData = this.myForm.value;
    const saveFileParams = {
      body: {
        pathImage: this.imagePath,
      }
    };

    if (this.uploadedImage) {
      saveFileParams.body.pathImage = this.uploadedImage;
    }

    const operation$ = this.button === "Ajouter" 
      ? this.typeService.addtypebien(saveFileParams, typeBienData)
      : this.typeService.updatetypebien(typeBienData, this.selectedType.id, saveFileParams);

    operation$.subscribe({
      next: () => {
        this.handleSuccess(`Type de bien ${this.button === 'Ajouter' ? 'ajouté' : 'modifié'} avec succès`);
        this.getTypes();
      },
      error: () => {
        this.handleError(`Erreur lors ${this.button === 'Ajouter' ? "de l'ajout" : 'de la modification'} du type de bien`);
      }
    });
  }

  handleError(message: string): void {
    Swal.fire({
      title: 'Erreur',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  handleSuccess(message: string): void {
    Swal.fire({
      title: 'Succès',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.closeModal();
      this.resetForm();
    });
  }

  getTypes(): void {
    this.typeService.getTypebien().subscribe({
      next: (response) => {
        this.types = response;
        this.convertImages();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des types', error);
        this.handleError('Erreur lors de la récupération des types');
      }
    });
  }

  convertImages(): void {
    this.types.forEach(type => {
      if (type.imageDto?.image) {
        type.photo = `data:${type.imageDto.type};base64,${type.imageDto.image}`;
      }
    });
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePath = reader.result;
      };
      reader.readAsDataURL(this.uploadedImage);
    }
  }
}