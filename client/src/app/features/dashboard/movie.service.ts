import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  public list(listId: string): Observable<string[]> {
    return this.http.get<string[]>(environment.api + 'list', {
      params: { listId },
    });
  }
}
