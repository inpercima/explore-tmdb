import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ListDto } from './list-dto.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  public list(value: any): Observable<ListDto> {
    return this.http.get<ListDto>(environment.api + 'list', {
      params: {
        listId: value.listId,
        language: value.language,
      },
    });
  }
}
