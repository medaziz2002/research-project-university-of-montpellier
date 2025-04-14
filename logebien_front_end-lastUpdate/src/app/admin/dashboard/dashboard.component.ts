import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AnnonceService } from '../../services/annonce/annonce.service';
import { TypeBien } from '../../models/Type_bien.model';
import { TypeService } from '../../services/type/type.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  stats: any = {
    users: 0,
    annonces: 0,
    types: 0
  };

  constructor(private userService: UserService,private annonceService:AnnonceService,private typeService:TypeService) {}

  ngOnInit(): void {
     this.getNombreUsers();
     this.getNombreAnnonces();
     this.getNombreTypes();
  }


  getNombreUsers() {
    this.userService.getNombreUsers().subscribe(
      (response) => {
        this.stats.users = response;
      },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );
  }

  getNombreAnnonces() {
    this.annonceService.getNombreAnnonces().subscribe(
      (response) => {
        this.stats.annonces = response;
      },
      (error) => {
        console.error('Error fetching annonce count:', error);
      }
    );
  }


  getNombreTypes() {
      this.typeService.getNombreTypebien().subscribe((response) => {
  this.stats.types = response;
},(error) => {
console.error('Error fetching type count:', error);

}
  );
  
  }


}
