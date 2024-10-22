import { Component, inject, OnInit } from '@angular/core';
import { NewsTypesService } from './news-types.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { KeyValuePairModel } from '../../shared/models/key-value-pair.model';
import { NewsTypesDialogComponent } from '../../shared/dialogs/news-types-dialog/news-types-dialog.component';
import { DeleteNewsTypeComponent } from '../../shared/dialogs/delete-news-type/delete-news-type.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-news-types',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './news-types.component.html',
  styleUrl: './news-types.component.scss',
})
export class NewsTypesComponent implements OnInit {
  public newsTypesService = inject(NewsTypesService);
  private _dialog = inject(MatDialog);
  filterText: string = '';
  private searchSubject = new Subject<string>();


  ngOnInit() {
    this.initTypes();
    this.setupSearch();
  }

  private setupSearch() {
    this.searchSubject.pipe().subscribe(searchTerm => {
      this.filterText = searchTerm;
      this.initTypes();
    });
    this.initTypes();
  }

  onSearchChange(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
  }

  initTypes() {
    this.newsTypesService.getNewsTypes(this.filterText).subscribe((result) => {
      const types = result.parameters[result.key] as KeyValuePairModel[];
      this.newsTypesService.newsTypes.set(types);
    });
  }

  openEditDialog(type: KeyValuePairModel | null) {
    const dialog = this._dialog.open(NewsTypesDialogComponent, {data: type});
    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.initTypes();
        }
      }
    )
  }

  openDeleteTypeDialog(type: KeyValuePairModel) {
    const dialog = this._dialog.open(DeleteNewsTypeComponent, {data: type.name});
    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.newsTypesService.deleteNewsType(type.id).subscribe(
            () => {
              this.initTypes();
            }
          );
        }
      }
    )
  }
}
