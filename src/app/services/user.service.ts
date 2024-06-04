import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl : string;
  private myApiUrl : string;
  constructor(private http:HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = "api/users/"
  }

  signIn(user:User):Observable<any>
  {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }
  login(user: User): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
   }
  configUser(user:User): Observable<any>
  {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/configUser`, user)
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}getuser`);
  }
  desactivar(user: any): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}desactivar`, user)
   }
   verifyUser(token: any): Observable<any> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}verify`, token)
  }

}
