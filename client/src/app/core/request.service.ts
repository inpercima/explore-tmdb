import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class RequestService {

  public url(url: string): string {
    return `${environment.api}${url}${environment.apiSuffix}`;
  }

}
