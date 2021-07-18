import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Title } from './title.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private http: HttpClient) { }

  public list(listId: string): Observable<Title[]> {
    return this.http.get<Title[]>(environment.api + 'list', {
      params: { listId },
    });
  }
}
