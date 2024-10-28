import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() imageUrl: string = '';
  @Input() timeAgo: string = '';
  @Input() category: string = '';
  @Input() platforms: string[] = [];
}
