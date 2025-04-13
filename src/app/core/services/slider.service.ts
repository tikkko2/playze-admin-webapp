import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  constructor(private http: HttpService) {}

  getSliders() {
    return this.http.get('/boards');
  }

  createSlider(formData: FormData) {
    return this.http.post('/boards', formData);
  }

  deleteSlider(id: string) {
    return this.http.delete(`/boards/${id}`);
  }
}
