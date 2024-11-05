import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AnnouncementTypeModel } from '../models/announcement-type.model';
import { Router } from '@angular/router';
import { AnnouncementService } from '../../pages/announcement/announcement.service';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
})
export class NewsCardComponent {
  private _router = inject(Router);
  private _announcementService = inject(AnnouncementService);

  newsCardDropdown: boolean = false;
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() imageUrl: string = '';
  @Input() timeAgo: string = '';
  @Input() category!: AnnouncementTypeModel;
  @Input() platforms: string[] = [];
  @Input() published: boolean = false;
  @Input() publishTime: string = '';

  openNewsDropdown() {
    this.newsCardDropdown = !this.newsCardDropdown;
  }

  goToNewsDetail(id: number) {
    this._router.navigate(['/dashboard/announcement', id]);
  }

  remove() {
    this._announcementService.delete(this.id).subscribe((result) => {
      this.openNewsDropdown();
    });
  }
}
