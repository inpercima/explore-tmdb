import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomItem } from './item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private http = inject(HttpClient);

  /**
   * Add a new custom item to the database
   * Requires authentication via API key
   */
  public addItem(item: CustomItem): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.customApiKey}`,
    });

    return this.http.post(environment.api + 'item', item, { headers });
  }

  /**
   * Get all custom items from the database
   */
  public getCustomItems(): Observable<{ items: any[] }> {
    return this.http.get<{ items: any[] }>(environment.api + 'item');
  }
}
