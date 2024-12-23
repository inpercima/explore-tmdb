import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { List } from './list.model';
import { Query } from './query.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private http = inject(HttpClient);


  public list(query: Query): Observable<List> {
    return this.http.get<List>(environment.api + 'list', {
      params: {
        listId: query.listId,
        language: query.language,
      },
    });
  }
}
