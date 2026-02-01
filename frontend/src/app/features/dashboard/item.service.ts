import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomItem } from './item.model';

export interface AddItemResponse {
  success: boolean;
  id: string;
  title: string;
  comment: string;
  media_type: string;
  created_by: string;
}

export interface CustomItemData {
  id: number;
  title: string;
  comment: string;
  media_type: string;
  created_at: string;
  created_by: string;
}

export interface GetItemsResponse {
  items: CustomItemData[];
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private http = inject(HttpClient);

  /**
   * Add a new custom item to the database
   * Requires authentication via API key
   */
  public addItem(item: CustomItem): Observable<AddItemResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.customApiKey}`,
    });

    return this.http.post<AddItemResponse>(environment.api + 'item', item, { headers });
  }

  /**
   * Get all custom items from the database
   */
  public getCustomItems(): Observable<GetItemsResponse> {
    return this.http.get<GetItemsResponse>(environment.api + 'item');
  }
}
