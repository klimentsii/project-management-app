import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserNoIdModel} from "../models/user";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private readonly url = {
    Users: 'users',
    Auth: ['signin', 'signup'],
    Boards: 'boards',
    Columns: 'columns',
    Tasks: 'tasks',
    File: 'file'
  }

  /** Users **/
  getUsers$(): Observable<UserNoIdModel | null> {
    return this.http.get<UserNoIdModel | null>(this.url.Users);
  }

  getUserById$(id: UUIDType): Observable<UserNoIdModel | null> {
    return this.http.get<UserNoIdModel | null>(`${this.url.Users}/${id}`);
  }

  deleteUserById(id: UUIDType): Observable<Response> {
    return this.http.delete<Response>(`${this.url.Users}/${id}`)
      .pipe(
        tap((response: Response) => {
          console.log(response);
        })
      )
  }

  updateUser(id: UUIDType, name?: string, login?: string, password?: string): Observable<ArrayBuffer> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.put<ArrayBuffer>(`${this.url.Users}/${id}`,
      {
        "name": name,
        "login": login,
        "password": password
      }, {headers}
    );
  }
}
