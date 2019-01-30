import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  jwt: string = localStorage.getItem('jwt');
  urlList: string;
  urlListTasks: string;
  urlJiraUser = 'api/jira/2';
  // options = { headers: { Authorization: `Bearer ${this.jwt}` } };
  constructor(private http: HttpClient) { }

  getJiraUser(){
    return this.http.get(this.urlJiraUser).toPromise();
  }
 /*  getLists(): any {
    return this.http.get(this.urlList, this.options).toPromise();
  }
  getTasks(idlist: number): any {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.urlListTasks + idlist, this.options)
        .toPromise()
        .then(tasks => {
          if (tasks) {
            resolve(tasks);
          } else {
            resolve([]);
          }
        })
        .catch(error => {
          console.log(error);
          resolve([]);
        });
    });
  } */

}
