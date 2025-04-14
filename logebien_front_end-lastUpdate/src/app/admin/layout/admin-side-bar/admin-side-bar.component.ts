import { Component, OnInit } from '@angular/core';
import { faUsers ,faBullhorn,faSlidersH} from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})
export class AdminSideBarComponent implements OnInit {
Fausers = faUsers;
Fabullhorn = faBullhorn;
FaslidersH = faSlidersH;
  stats: any = {
    users: 0,
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
     this.getNombreUsers();

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


}
