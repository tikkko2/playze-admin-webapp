import { inject, Injectable, signal } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { KeyValuePairModel } from '../../shared/models/key-value-pair.model';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsTypesService {
  private _httpService = inject(HttpService);

  newsTypes = signal<KeyValuePairModel[]>([]);


  getNewsTypes(name: string) {
    return this._httpService.get(`/announcements/types?name=${name}`)
  }
}
