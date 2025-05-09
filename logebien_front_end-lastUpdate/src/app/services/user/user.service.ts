import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL: string = "http://www.aziz.com/microservice-authentification/api/v1/users";
  constructor(private http:HttpClient) { }




  checkIfPasswordIsValid(email :string):Observable<any>{
    console.log("je suis la checkIfPasswordIsValid");
    return this.http.get<any>(this.apiURL+"/checkIfPasswordIsValid/"+email);
  }
  
  generateToken(email:string):Observable<any>{
    return this.http.get<any>(this.apiURL+"/generateToken/"+email);
  }
 
  

  getUsers( params:HttpParams ):Observable<any>{
    return this.http.get<any>(this.apiURL,{params:params});
  }


  getNombreUsers(  ):Observable<any>{
    return this.http.get<any>(this.apiURL+"/count");
  }

  getUserById(id:number):Observable<any>{
    return this.http.get<any>(this.apiURL+"/api/getUserById/"+id);
  }

  updateUser(id:number,user:any):Observable<any>{
    return this.http.put<any>(this.apiURL+"/api/updateUser/"+id,user);
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete<any>(this.apiURL+"/api/deleteUser/"+id);
  }

  addUser(user:any):Observable<any>{
    return this.http.post<any>(this.apiURL+"/addUser",user);
  }



 bloquerUser(id:number):Observable<any>{
  return this.http.get<any>(this.apiURL+"/blockUser/"+id);
 }

  debloquerUser(id:number):Observable<any>{
    return this.http.get<any>(this.apiURL+"/unblockUser/"+id);
  }

  
}
