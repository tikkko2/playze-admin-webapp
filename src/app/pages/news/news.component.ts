import { Component, inject } from '@angular/core';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  public _navigationService = inject(NavigationService);
}
