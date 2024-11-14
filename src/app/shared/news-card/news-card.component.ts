import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AnnouncementTypeModel } from '../models/announcement-type.model';
import { Router } from '@angular/router';
import { AnnouncementService } from '../../pages/announcement/announcement.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteNewsTypeComponent } from '../dialogs/delete-news-type/delete-news-type.component';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormsModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
})
export class NewsCardComponent {
  private _router = inject(Router);
  private _announcementService = inject(AnnouncementService);
  private _dialog = inject(MatDialog);

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
  @Output() deleted = new EventEmitter<string>();

  openNewsDropdown() {
    this.newsCardDropdown = !this.newsCardDropdown;
  }

  goToNewsDetail(id: any) {
    this._router.navigate(['/dashboard/announcement', id]);
  }

  remove() {
    const dialog = this._dialog.open(DeleteNewsTypeComponent, {
      data: this.title,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this._announcementService.delete(this.id).subscribe((result) => {
          this.openNewsDropdown();
          this.deleted.emit(this.id);
        });
      }
    });
  }

  changePublic() {
    this._announcementService.changeVisibility(this.id).subscribe((result) => {
      this.deleted.emit(this.id);
    });
  }
}
