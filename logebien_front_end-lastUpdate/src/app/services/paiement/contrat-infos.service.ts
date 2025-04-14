import { Injectable } from '@angular/core';
import { ContratLocation } from 'src/app/models/ContratLocation.model';
import { User } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class ContratInfosService {


  public contratLocation: ContratLocation=new ContratLocation();
  


  constructor() { }

 public setContratLocation(contratLocation:ContratLocation){
    this.contratLocation=contratLocation;
  }

  public getContratLocation(){
    return this.contratLocation;
  }





}
