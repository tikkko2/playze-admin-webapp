import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-news-description',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './news-description.component.html',
  styleUrl: './news-description.component.scss'
})
export class NewsDescriptionComponent {

}
