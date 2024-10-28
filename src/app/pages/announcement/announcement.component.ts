import { Component } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { NewsCardComponent } from '../../shared/news-card/news-card.component';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [PaginationComponent, NewsCardComponent],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss'
})
export class AnnouncementComponent {
  totalPages = 10;
  currentPage = 1;

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    // this.loadGames(this.currentPage, this.currentFilters, this.orderBy, this.searchValue);
}
}
