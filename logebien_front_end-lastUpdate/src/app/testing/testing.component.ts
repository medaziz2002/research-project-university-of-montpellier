import { Component } from '@angular/core';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent {
  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }
}
