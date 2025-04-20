import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface SaveFile$Params {
  body?: {
    pathImage: Blob;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TypeService {
   apiURL: string = "http://localhost:8888/microservice-logement/api/v1/typebiens"

  constructor(private http : HttpClient) { }


  getTypebien():Observable<any>{
    return this.http.get<any>(this.apiURL);
  }

  getNombreTypebien():Observable<any>{
    return this.http.get<any>(this.apiURL+"/count");
  }


  getTypebienById(id:number):Observable<any>{
    return this.http.get<any>(this.apiURL+"/"+id);
  }

  addtypebien(params: SaveFile$Params, typeBien: any): Observable<any> {
    const formData = new FormData();
    formData.append('pathImage', params.body?.pathImage || '');
    formData.append('typeBienDTO', new Blob([JSON.stringify(typeBien)], { type: 'application/json' }));
  
    return this.http.post<any>(`${this.apiURL}`, formData);
  }
  
  updatetypebien(typebien: any, id: number, params: SaveFile$Params): Observable<any> {
    const formData = new FormData();
    formData.append('pathImage', params.body?.pathImage || '');
    formData.append('typeBienDTO', new Blob([JSON.stringify(typebien)], { type: 'application/json' }));
    console.log("Je suis dans le update type bien service et le contenu de formData est : " + formData.get('pathImage'));
    return this.http.put<any>(`${this.apiURL}/${id}`, formData);
  }
  
  

  deletetypebien(id:number):Observable<any>{
    return this.http.delete<any>(this.apiURL+"/deletetypebien/"+id);
  }



}
