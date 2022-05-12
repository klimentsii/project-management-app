import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token, UserModelExtended, UserNoIdModel } from '../models/user';
import { Observable, tap } from 'rxjs';
import { BoardModel, BoardModelExtended } from '../models/boards';
import { ColumnModel, ColumnModelExtended } from '../models/columns';
import { TaskModelPlus, TaskModelPlusFiles } from '../models/tasks';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private readonly url = {
    Users: 'users',
    Auth: ['signin', 'signup'],
    Boards: 'boards',
    Columns: 'columns',
    Tasks: 'tasks',
    File: 'file',
    Search: 'search',
  };

  /** Users **/

  getUsers$(): Observable<UserNoIdModel[]> {
    const headers = new HttpHeaders().set('accept', 'application/json');
    return this.http.get<UserNoIdModel[]>(this.url.Users, { headers });
  }

  getUserById$(id: UUIDType): Observable<UserNoIdModel> {
    const headers = new HttpHeaders().set('accept', 'application/json');
    return this.http.get<UserNoIdModel>(`${this.url.Users}/${id}`, { headers });
  }

  deleteUser$(id: UUIDType): Observable<Response> {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.delete<Response>(`${this.url.Users}/${id}`, { headers }).pipe(
      tap((response: Response) => {
        console.log(response);
      }),
    );
  }

  updateUser$(
    id: UUIDType,
    newName: string,
    newLogin: string,
    newPassword: string,
  ): Observable<UserModelExtended> {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.put<UserModelExtended>(
      `${this.url.Users}/${id}`,
      {
        name: newName,
        login: newLogin,
        password: newPassword,
      },
      { headers },
    );
  }

  /** Authorization **/

  signIn$(login: string, password: string): Observable<Token> {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.post<Token>(
      this.url.Auth[0],
      {
        login: login,
        password: password,
      },
      { headers },
    );
  }

  signUp$(name: string, login: string, password: string): Observable<UserNoIdModel | null> {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.http.post<UserNoIdModel | null>(
      this.url.Auth[1],
      {
        name: name,
        login: login,
        password: password,
      },
      { headers },
    );
  }

  /** Boards **/

  getBoards$(): Observable<BoardModel[]> {
    const headers = new HttpHeaders().set('accept', 'application/json');
    return this.http.get<BoardModel[]>(this.url.Boards, { headers });
  };

  createBoard$(title: string, description: string): Observable<BoardModel> {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.post<BoardModel>(
      this.url.Boards,
      {
        title: title,
        description: description,
      },
      { headers },
    );
  };

  getBoardById$(id: UUIDType): Observable<BoardModelExtended> {
    const headers = new HttpHeaders().set('accept', 'application/json');
    return this.http.get<BoardModelExtended>(`${this.url.Boards}/${id}`, { headers });
  };

  deleteBoard$(id: UUIDType): Observable<Response> {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.delete<Response>(`${this.url.Boards}/${id}`, { headers });
  }

  updateBoard$(id: UUIDType, newTitle: string, newDecsription: string): Observable<BoardModel> {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.put<BoardModel>(
      `${this.url.Boards}/${id}`,
      {
        title: newTitle,
        description: newDecsription,
      },
      { headers },
    );
  };

  /** Columns **/

  getColumns$(boardId: UUIDType): Observable<ColumnModel[]> {
    const headers = new HttpHeaders().set('accept', 'application/json');
    return this.http.get<ColumnModel[]>(`${this.url.Boards}/${boardId}/${this.url.Columns}`, {
      headers,
    });
  };

  getColumnById$(boardId: UUIDType, columnId: UUIDType): Observable<ColumnModelExtended> {
    const headers = new HttpHeaders().set('accept', 'application/json');
    return this.http.get<ColumnModelExtended>(
      `${this.url.Boards}/${boardId}/${this.url.Columns}/${columnId}`,
      { headers },
    );
  };

  createColumn(boardId: UUIDType, title: string, order: number): Observable<ColumnModel> {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.post<ColumnModel>(
      `${this.url.Boards}/${boardId}/${this.url.Columns}`,
      {
        title: title,
        order: order,
      },
      { headers },
    );
  };

  deleteColumn$(boardId: UUIDType, columnId: UUIDType): Observable<Response> {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http
      .delete<Response>(`${this.url.Boards}/${boardId}/${this.url.Columns}/${columnId}`, {
        headers,
      })
      .pipe(
        tap((response: Response) => {
          console.log(response);
        }),
      );
  };

  updateColumn$(
    boardId: UUIDType,
    columnId: UUIDType,
    newTitle: string,
    newOrder: number,
  ): Observable<ColumnModel> {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.put<ColumnModel>(
      `${this.url.Boards}/${boardId}/${this.url.Columns}/${columnId}`,
      {
        title: newTitle,
        order: newOrder,
      },
      { headers },
    );
  };

  /** Tasks **/

  getTasks$(boardId: UUIDType, columnId: UUIDType): Observable<TaskModelPlusFiles[]> {
    const headers = new HttpHeaders().set('accept', 'application/json');
    return this.http.get<TaskModelPlusFiles[]>(
      `${this.url.Boards}/${boardId}/${this.url.Columns}/${columnId}/${this.url.Tasks}`,
      { headers },
    );
  }

  getTaskById$(
    boardId: UUIDType,
    columnId: UUIDType,
    taskId: UUIDType,
  ): Observable<TaskModelPlusFiles> {
    const headers = new HttpHeaders().set('accept', 'application/json');
    return this.http.get<TaskModelPlusFiles>(
      `${this.url.Boards}/${boardId}/${this.url.Columns}/${columnId}/${this.url.Tasks}/${taskId}`,
      { headers },
    );
  }

  createTask(
    boardId: UUIDType,
    columnId: UUIDType,
    title: string,
    order: number,
    description: string,
    done: boolean,
    userId: UUIDType,
  ): Observable<TaskModelPlus> {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.post<TaskModelPlus>(
      `${this.url.Boards}/${boardId}/${this.url.Columns}/${columnId}`,
      {
        title: title,
        done: done,
        order: order,
        description: description,
        userId: userId,
      },
      { headers },
    );
  }

  deleteTask$(boardId: UUIDType, columnId: UUIDType, taskId: UUIDType): Observable<Response> {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http
      .delete<Response>(
        `${this.url.Boards}/${boardId}/${this.url.Columns}/${columnId}/${this.url.Tasks}/${taskId}`,
        { headers },
      )
      .pipe(
        tap((response: Response) => {
          console.log(response);
        }),
      );
  }

  updateTask$(
    boardId: UUIDType,
    columnId: UUIDType,
    taskId: UUIDType,
    newTitle: string,
    newOrder: number,
    done: boolean,
    newDescription: string,
    newUserId: UUIDType,
    newBoardId: UUIDType,
    newColumnId: UUIDType,
  ): Observable<TaskModelPlus> {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.put<TaskModelPlus>(
      `${this.url.Boards}/${boardId}/${this.url.Columns}/${columnId}/${this.url.Tasks}/${taskId}`,
      {
        title: newTitle,
        done: done,
        order: newOrder,
        description: newDescription,
        userId: newUserId,
        boardId: newBoardId,
        columnId: newColumnId,
      },
      { headers },
    );
  }

  /** Search **/

  search$(): Observable<TaskModelPlusFiles[]> {
    const headers = new HttpHeaders().set('accept', 'application/json');
    return this.http.get<TaskModelPlusFiles[]>(`${this.url.Search}/${this.url.Tasks}`, { headers });
  }

  /** Files **/

  uploadFile(taskId: UUIDType, file: File): Observable<Response> {
    const headers = new HttpHeaders().set('accept', '*/*').set('Content-Type', 'application/json');
    return this.http
      .post<Response>(
        `${this.url.File}`,
        {
          taskId: taskId,
          file: file,
        },
        { headers },
      )
      .pipe(
        tap((response: Response) => {
          console.log(response);
        }),
      );
  }

  downloadFile(taskId: UUIDType, filename: string): Observable<Response> {
    const headers = new HttpHeaders().set('accept', '*/*').set('Content-Type', 'application/json');
    return this.http.get<Response>(`${this.url.File}/${taskId}/${filename}`, { headers }).pipe(
      tap((response: Response) => {
        console.log(response);
      }),
    );
  }
}
