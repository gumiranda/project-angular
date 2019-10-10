import { Injectable } from '@angular/core';
import{AppConstants} from './../app.constants';
import { HttpClient } from "@angular/common/http";
import {map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }
  findAll(params): Observable<any> {
    return this.http
      .get(AppConstants.BASE_URL , {
        params: params,
      }).pipe(
        map(res => <any>res)
        ,catchError(error => of(`Erro: ${error}`))
        );
  }
}
