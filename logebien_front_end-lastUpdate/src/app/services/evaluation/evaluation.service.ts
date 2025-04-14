import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  apiURL: string = "http://localhost:8000/api"
  constructor(private http:HttpClient) { }


  addEvaluation(data:any):Observable<any>{
    return this.http.post<any>(this.apiURL+"/addEvaluation",data);
  }

  getEvaluationByAnnonce(id:number):Observable<any>{
    return this.http.get<any>(this.apiURL+"/getEvaluationByAnnonce/"+id);
  }
//  Route::get('/getMoyenneNoteEvaluationByAnnonce/{id}',[EvaluationsController::class,'getMoyenneNoteEvaluationByAnnonce']);
  getMoyenneNoteEvaluationByAnnonce(id:number):Observable<any>{
    return this.http.get<any>(this.apiURL+"/getMoyenneNoteEvaluationByAnnonce/"+id);
  }

}
