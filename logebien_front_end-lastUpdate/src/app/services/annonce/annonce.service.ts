import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface SaveFile$Params {
  body?: {
    pathImages: Blob;
  };
}
@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
 apiURL: string = "http://www.aziz.com/api/logement/api/v1/annonces"
  constructor(private http:HttpClient) { }

  getAnnonces(params:HttpParams):Observable<any>{
    return this.http.get<any>(this.apiURL,{params:params});
  }




  getNombreAnnonces():Observable<any>{
    return this.http.get<any>(this.apiURL+"/count");
  }


  getAnnonceById(id:number):Observable<any>{
    return this.http.get<any>(this.apiURL+"/"+id);
  }



  addAnnonce(formData: FormData): Observable<any> {
    // Pas besoin de headers spécifiques pour FormData
    // Le navigateur va automatiquement ajouter:
    // Content-Type: multipart/form-data; boundary=...
    return this.http.post(`${this.apiURL}`, formData);
  }
  



  modifierAnnonce(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  deleteAnnonce(id:number):Observable<any>{
    return this.http.delete<any>(this.apiURL+"/deleteAnnonce/"+id);
  }

  getAnnonceByUser(id:number):Observable<any>{
    return this.http.get<any>(this.apiURL+"/getAnnonceByUser/"+id);
  }

 

  archiverannonce(id:number):Observable<any>{
    return this.http.get<any>(this.apiURL+"/archiverannonce/"+id);
  }

  rendreAnnonceVisible(id:number):Observable<any>{
    return this.http.get<any>(this.apiURL+"/visibleannonce/"+id);
  }

  accepterAnnonce(id:number):Observable<any>{
    return this.http.get<any>(this.apiURL+"/accepteannonce/"+id);
  }

  rejeterAnnonce(id:number,cause:string):Observable<any>{
    let send :FormData = new FormData();
    send.append('cause',cause);
    return this.http.post<any>(this.apiURL+"/rejeterannonce/"+id,send);
  }


  getLast4Annonces(params:HttpParams):Observable<any>{
    return this.http.get<any>(this.apiURL+"/getLast4Annonces",{params:params});
  }



  getAnnonceByUserId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/getAnnonceByProp/${id}`);
  }
  

getGouvernorats():Observable<any>{
  return this.http.get<any>("../../../assets/data/tunisia.json");
}


}
