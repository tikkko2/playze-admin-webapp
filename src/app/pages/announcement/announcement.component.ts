import { Component } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { NewsCardComponent } from '../../shared/news-card/news-card.component';
import { MatDialog } from '@angular/material/dialog';
import { AddNewsAnnComponent } from '../../shared/dialogs/add-news-ann/add-news-ann.component';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [PaginationComponent, NewsCardComponent],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss',
})
export class AnnouncementComponent {
  totalPages = 10;
  currentPage = 1;

  constructor(
    private _dialog: MatDialog
  ) {}

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    // this.loadGames(this.currentPage, this.currentFilters, this.orderBy, this.searchValue);
  }

  addNewsDialog() {
    this._dialog.open(AddNewsAnnComponent);
  }
}
