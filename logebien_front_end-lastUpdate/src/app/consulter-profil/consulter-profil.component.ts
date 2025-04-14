import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/User.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-consulter-profil',
  templateUrl: './consulter-profil.component.html',
  styleUrls: ['./consulter-profil.component.css']
})
export class ConsulterProfilComponent implements OnInit {
_showProfil = true;
_showEditProfil = false;
_showChangePassword = false;
User:any;
acienmot:string="";
novmot:string="";
nvmot1:string="";
password: any = {
  acienmot: "",
  novmot: "",

};
loggedUser: User = new User;

constructor(private  authService:AuthService,private _snackBar: MatSnackBar ) { }

async  ngOnInit() {
  await this.authService.setLoggedUser();
  this.loggedUser = this.authService.getLoggedUser();
    this.User = this.loggedUser;
    if (this.User.dateNaissance) {
      this.User.dateNaissance = this.formatDateForInput(this.User.dateNaissance);
    }
}


private formatDateForInput(date: any): string {
  // Si la date est déjà au bon format (yyyy-MM-dd)
  if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return date;
  }
  
  // Si c'est un objet Date
  if (date instanceof Date) {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
  
  // Si c'est une chaîne dans un autre format
  if (typeof date === 'string') {
    const parsedDate = new Date(date);
    return formatDate(parsedDate, 'yyyy-MM-dd', 'en-US');
  }
  
  return '';
}


showProfil(){
  this._showProfil = true;
  this._showEditProfil = false;
  this._showChangePassword = false;
}

showEditProfil(){
  this.ngOnInit();
  this._showProfil = false;
  this._showEditProfil = true;
  this._showChangePassword = false;
}
showChangePassword(){
  this.ngOnInit();
  this._showProfil = false;
  this._showEditProfil = false;
  this._showChangePassword = true;
}
modifierProfil() {
  console.log(this.User);
  this.authService.modifierProfil(this.loggedUser.id,this.User).subscribe(
    (res: any) => {
      console.log(res);
      this.User = res;
      this.User = this.User.user;
      console.log(this.User);
      
      // Show success snackbar on successful profile modification
      this.openSnackBar('Profile updated successfully', 'success');
    },
    (error) => {
      console.error(error);
      // Show error snackbar if there's an error during profile modification
      this.openSnackBar('Failed to update profile', 'error');
    }
  );
}
modifierPassword() {
  if (!this.acienmot || !this.novmot || !this.nvmot1) {
    this.openSnackBar('Veuillez remplir tous les champs', 'error');
    return;
  }

  this.authService.modifyPassword(this.acienmot, this.novmot, this.loggedUser.id).subscribe(
    (res: any) => {
      this.openSnackBar('Mot de passe mis à jour avec succès', 'success');
      this.acienmot = '';
      this.novmot = '';
      this.nvmot1 = '';
    },
    (error) => {
      console.error(error);
      this.openSnackBar(error.error || 'Échec de la mise à jour du mot de passe', 'error');
    }
  );
}
  
  openSnackBar(message: string, panelClass: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      panelClass: [panelClass],
      horizontalPosition:'center',
      verticalPosition: 'top',
      
    });
  }


}



