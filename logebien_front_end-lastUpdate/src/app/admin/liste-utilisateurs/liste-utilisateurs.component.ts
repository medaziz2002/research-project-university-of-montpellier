import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user/user.service';
import { faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrls: ['./liste-utilisateurs.component.css']
})
export class ListeUtilisateursComponent {
  users: any;
  faBan = faBan;
  faCheck = faCheck;
  totalPages!: number;
  totalElements!: number;
  currentPage: number = 1;
  searchTerm: string = '';
  allUsers: any[] = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUtilisateurs(this.currentPage);
  }

  getUtilisateurs(pageNumber: number) {
    let params: HttpParams = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', '3');
  
    this.userService.getUsers(params).subscribe(
      (data) => {
        this.users = data.users;
        console.log("Réponse reçue :",data )
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.currentPage = pageNumber;
        this.allUsers = [...data.users];
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }
  

  bloquerUser(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir bloquer cet utilisateur?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Bloquer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.bloquerUser(id).subscribe(
          (data) => {
            this.getUtilisateurs(this.currentPage);
            Swal.fire(
              'Bloqué!',
              'Utilisateur bloqué avec succès',
              'success'
            );
          },
          (error) => {
            Swal.fire(
              'Erreur!',
              'Une erreur est survenue lors du blocage',
              'error'
            );
          }
        );
      }
    });
  }

  debloquerUser(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir débloquer cet utilisateur?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Débloquer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.debloquerUser(id).subscribe(
          (data) => {
            this.getUtilisateurs(this.currentPage);
            Swal.fire(
              'Débloqué!',
              'Utilisateur débloqué avec succès',
              'success'
            );
          },
          (error) => {
            Swal.fire(
              'Erreur!',
              'Une erreur est survenue lors du déblocage',
              'error'
            );
          }
        );
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getUtilisateurs(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUtilisateurs(this.currentPage);
    }
  }



filterUsers() {
  const search = this.searchTerm.trim().toLowerCase();
  if (search === '') {
    this.users = [...this.allUsers];
  } else {
    this.users = this.allUsers.filter((user: any) => {
      return (
        user.nom?.toLowerCase().includes(search) ||
        user.prenom?.toLowerCase().includes(search) ||
        user.role?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search)
      );
    });
  }
}


}