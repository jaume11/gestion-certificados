import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedService {
 urlRegister = '/api/users';
 urlRegisterJira = '/api/jira';
 urlLogin = '/api/auth'
 jwt: any;
 dataUser: any;
 user_id: string;
 constructor(private http: HttpClient, private router: Router) { }

 register(username, password, email, role) {
   console.log(username, password, email, role, ' - registerFunctionApi.');
   const body = { username, password, email, role };
   // creamos un usuario de jira con el username y password del usuario
   // this.registerJiraUser(username, password);
   return this.http.post(this.urlRegister, body).toPromise();
 }

 registerJiraUser(user_id, username, password){
  const body = { user_id, username, password };
  return this.http.post(this.urlRegisterJira, body).toPromise();
 }

 login(username, password) {
   const body = { username, password };
   return new Promise((resolve, reject) => {
     this.http.post(this.urlLogin, body)
       .toPromise().then(response => {
          console.log(response, 'status.200');
          this.dataUser = {...response};
          let jwt = this.dataUser.password;
          this.jwt = jwt;
          
          console.log(this.dataUser.id, 'primer valor');
          localStorage.setItem('jwt', this.jwt);
          localStorage.setItem('id', this.dataUser.id);
          localStorage.setItem('userName', this.dataUser.username);
          // localStorage.setItem('role', this.dataUser.role);
          resolve(200);
        console.log('fin login api');
      }).catch(() => {
          reject('User o password not found');
        });
   });
 }
 authLogout(): boolean {
    localStorage.removeItem('jwt');
    localStorage.removeItem('id');
    localStorage.removeItem('user_id');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
    console.log('borrado localStorage', this.jwt, this.dataUser);
    return false;
 }
 isAuthenticated(): boolean {
   const token = localStorage.getItem('jwt');
   if (token !== null) {
     return true;
   } else {
     return false;
   }
 }

}