import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginModel, Token, UserModel, UserModelExtended, UserNoIdModel} from "../models/user";
import {Observable, tap} from "rxjs";
import {BoardModel, BoardModelExtended} from "../models/boards";
import {ColumnModel, ColumnModelExtended} from "../models/columns";

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

  getUsers$(): Observable<UserNoIdModel[]> {
    return this.http.get<UserNoIdModel[]>(this.url.Users);
  }

  getUserById$(id: UUIDType): Observable<UserNoIdModel> {
    return this.http.get<UserNoIdModel>(`${this.url.Users}/${id}`);
  }

  deleteUser$(id: UUIDType): Observable<Response> {
    return this.http.delete<Response>(`${this.url.Users}/${id}`)
      .pipe(
        tap((response: Response) => {
          console.log(response);
        })
      )
  }

  updateUser$(id: UUIDType, name: string, login: string, password: string): Observable<UserModelExtended> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.put<UserModelExtended>(`${this.url.Users}/${id}`,
      {
        "name": name,
        "login": login,
        "password": password
      }, {headers}
    );
  }

  /** Authorization **/

  signIn$(login: string, password: string): Observable<Token> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.post<Token>(this.url.Auth[0],
      {
        "login": login,
        "password": password
      },
      {headers}
    )
  }

  signUp$(name: string, login: string, password: string): Observable<UserModel | null> {
    const headers = new HttpHeaders()
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

  /** Boards **/

  getBoards$(): Observable<BoardModel[]> {
    return this.http.get<BoardModel[]>(this.url.Boards);
  }

  createBoard$(title: string): Observable<BoardModel> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.post<BoardModel>(this.url.Boards,
      {
        "title": title
      },
      {headers}
    )
  }

  getBoardById$(id: UUIDType): Observable<BoardModelExtended> {
    return this.http.get<BoardModelExtended>(`${this.url.Boards}/${id}`);
  }

  deleteBoard$(id: UUIDType): Observable<Response> {
    return this.http.delete<Response>(`${this.url.Boards}/${id}`)
      .pipe(
        tap((response: Response) => {
          console.log(response);
        })
      )
  }

  updateBoard$(id: UUIDType, title: string): Observable<BoardModel> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.put<BoardModel>(`${this.url.Boards}/${id}`,
      {
        "title": title,
      }, {headers}
    );
  }

  /** Columns **/

  getColumns$(boardId: UUIDType): Observable<ColumnModel[]> {
    return this.http.get<ColumnModel[]>(`${this.url.Boards}/${boardId}/${this.url.Columns}`);
  }

  getColumnById$(boardId: UUIDType, columnId: UUIDType): Observable<ColumnModelExtended> {
    return this.http.get<ColumnModelExtended>(
      `${this.url.Boards}/${boardId}/${this.url.Columns}/${columnId}`);
  }

  createColumn(boardId: UUIDType, title: string, order: number): Observable<ColumnModel> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.post<ColumnModel>(`${this.url.Boards}/${boardId}/${this.url.Columns}`,
      {
        "title": title,
        "order": order
      },
      {headers}
    )
  }

  deleteColumn$(boardId: UUIDType, columnId: UUIDType): Observable<Response> {
    return this.http.delete<Response>(
      `${this.url.Boards}/${boardId}/${this.url.Columns}/${columnId}`)
      .pipe(
        tap((response: Response) => {
          console.log(response);
        })
      )
  }

  updateColumn$(boardId: UUIDType, columnId: UUIDType, title: string, order: number): Observable<ColumnModel> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.put<ColumnModel>(`${this.url.Boards}/${boardId}/${this.url.Columns}/${columnId}`,
      {
        "title": title,
        "order": order,
      }, {headers}
    );
  }







}
