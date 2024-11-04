import { inject, Injectable, signal } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { KeyValuePairModel } from '../../shared/models/key-value-pair.model';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private _httpService = inject(HttpService);
  private _gamesQuantity: number = 50;

  getGames(name: string) {
    return this._httpService.get(`/games/dropdown?Ammount=${this._gamesQuantity}&Name=${name}`);
  }

  uploadNews(data: any) {
    return this._httpService.post(`/announcements`, data);
  }
}
