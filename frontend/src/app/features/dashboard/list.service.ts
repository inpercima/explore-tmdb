import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListDto } from './list-dto.model';
import { environment } from '../../../environments/environment';
import { Query } from './query.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  public list(query: Query): Observable<ListDto> {
    return this.http.get<ListDto>(environment.api + 'list', {
      params: {
        listId: query.listId,
        language: query.language,
      },
    });
  }
}
