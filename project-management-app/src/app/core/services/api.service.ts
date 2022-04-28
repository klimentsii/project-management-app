import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginModel, Token, UserModel, UserNoIdModel} from "../models/user";
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
      .set("accept", "application/json")
      .set("Content-Type", "application/json");
    return this.http.put<ArrayBuffer>(`${this.url.Users}/${id}`,
      {
        "name": name,
        "login": login,
        "password": password
      }, {headers}
    );
  }

  /** Authorization **/

  signIn(login: string, password: string): Observable<Token> {
    const headers = new HttpHeaders()
      .set("accept", "application/json")
      .set("Content-Type", "application/json");
    return this.http.post<Token>(this.url.Auth[0],
      {
        "login": login,
        "password": password
      },
      {headers}
    )
  }

  signUp(name: string, login: string, password: string): Observable<UserModel | null> {
    const headers = new HttpHeaders()
      .set("accept", "application/json")
      .set("Content-Type", "application/json");
    return this.http.post<UserModel | null>(this.url.Auth[0],
      {
        "name": name,
        "login": login,
        "password": password
      },
      {headers}
    )
  }
}
