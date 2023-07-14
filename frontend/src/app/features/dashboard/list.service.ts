import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ListDto } from './list-dto.model';

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
