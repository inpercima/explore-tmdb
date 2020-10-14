import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Movie } from './movie.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  public list(listId: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(environment.api + 'list', {
      params: { listId },
    });
  }
}
