import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = "http://localhost:8888/microservice-authentification"
  token!:any;
  isloggedIn!:boolean;
  loggedUser!:User;
  isPasswordExpired=false;
  private helper = new JwtHelperService();
  constructor(private http:HttpClient,private userService:UserService) { }
  
  

login(user : User):Observable<any>
{
return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
}

getuser():Observable<any>
{  const token = localStorage.getItem('jwt');


const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

const options = { headers: headers };
console.log(options);

console.log(this.http.get<any>(this.apiURL+'/getUser',options).subscribe(e=>console.log(e)));
return this.http.get<any>(this.apiURL+'/getUser',options);
}
  

  register (user:any):Observable<any>{
    console.log(user);




    return this.http.post<any>(this.apiURL+"/api/v1/users/add",user);
  }

  modifyPassword(oldPassword: string, newPassword: string, userId: number): Observable<any> {
    const changePasswordRequest = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
  
    return this.http.put(`${this.apiURL}/api/v1/users/change-password/${userId}`, changePasswordRequest);
  }
  


 getUserByEmail(email:string):Observable<any>{
  return this.http.get<any>(this.apiURL+"/api/v1/users/getByEmail/"+email);
}




logout(){
  this.token = '';
  this.isloggedIn = false;
  this.loggedUser = new User();
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');

}

modifierProfil(userId:number,userDto:any):Observable<any>{


  return this.http.put(`${this.apiURL}/api/v1/users/${userId}`, userDto);

}
  
forgetpassword(email:any):Observable<any>{
  console.log(email);
  return this.http.post<any>(this.apiURL+'/reset',email);
}
changePassword(request:any):Observable<any>{
  return this.http.post<any>(this.apiURL+'/changePassword',request);
}
getgoogle():Observable<any>{
  console.log(this.http.get<any>(this.apiURL+'/google'));
  return this.http.get<any>(this.apiURL+'/google');
}


















saveToken(jwt: string): void {
  localStorage.setItem('jwt', jwt);
 
}

loadToken(): string | null {
  return localStorage.getItem('jwt');
}

getToken(): string | null {
  return this.loadToken();
}

decodeJWT(token: string): any {
  return this.helper.decodeToken(token);
}

isTokenExpired(token: string): boolean {
  return this.helper.isTokenExpired(token);
}

setIsPasswordExpired(set:boolean){
  this.isPasswordExpired=set;
  console.log(this.isPasswordExpired);
}

isAuthenticated(): boolean {
  const token = localStorage.getItem('jwt');
  return !!token; 
}


async setLoggedUser() {
  this.token = this.getToken();
  try {
    const data = await this.getUserByEmail(this.decodeJWT(this.token).sub).toPromise();
    this.loggedUser = data;
    console.log("le logged user est",this.loggedUser);
    this.isloggedIn = true;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

getLoggedUser(){
  this.setLoggedUser();
  return this.loggedUser;
}

isSuperAdmin() {
  return this.loggedUser?.role?.toUpperCase() === "SUPERADMIN";
}

isLocataire() {
  return this.loggedUser?.role.toUpperCase() === "LOCATAIRE";
}

isProprietaire() {
  return this.loggedUser?.role.toUpperCase() === "PROPRIETAIRE";
}



}
