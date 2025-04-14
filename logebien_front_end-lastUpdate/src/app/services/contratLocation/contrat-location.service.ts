import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratLocationService {

  apiURL: string = "http://localhost:8000/api"
  constructor(private http:HttpClient) { }



  // getAnnonces(params:HttpParams):Observable<any>{





 getContrats():Observable<any>{
    return this.http.get<any>(this.apiURL+"/getContrats");
  }

  getContratById(id:number):Observable<any>{
    return this.http.get<any>(this.apiURL+"/getContratById/"+id);
  }
  
  getContratByLocataire():Observable<any>{
    return this.http.get<any>(this.apiURL+"/getContratByLocataire");
  }

  addContrat(contrat:any):Observable<any>{
    return this.http.post<any>(this.apiURL+"/addContrat",contrat);
  }

  updateContrat(id:number,contrat:any):Observable<any>{
    return this.http.put<any>(this.apiURL+"/updateContrat/"+id,contrat);
  }

  deleteContrat(id:number):Observable<any>{
    return this.http.delete<any>(this.apiURL+"/deleteContrat/"+id);
  }


  changeEtat(id:number,etat:string,idPayement:string):Observable<any>{
    let send :FormData = new FormData();
    console.log(etat);
    send.append('etat',etat);
    send.append('idpayement',idPayement);
    return this.http.post<any>(this.apiURL+"/changeEtatContrat/"+id,send);
  }


  GetcontratByAnnonce(id:number):Observable<any>{
    return this.http.get<any>(this.apiURL+"/getContratPayeByAnnonce/"+id);
  }


}
