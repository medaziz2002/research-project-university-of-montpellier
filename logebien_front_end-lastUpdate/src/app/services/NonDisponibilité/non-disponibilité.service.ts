import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NonDisponibilitéService {

  apiURL: string = "http://localhost:8000/api"
  constructor(private http:HttpClient) { }



  



  rendreNonDisponible(data:any):Observable<any>{
    
    return this.http.post<any>(this.apiURL+"/rendreNonDisponible",data);
  }

  rendreDisponible(data:any):Observable<any>{
    return this.http.post<any>(this.apiURL+"/rendreDisponible",data);
  }

  getNonDisponibilitéByAnnonceId(id:number):Observable<any>{
    return this.http.get<any>(this.apiURL+"/getNonDisponibilitéByAnnonceId/"+id);
  }


}
