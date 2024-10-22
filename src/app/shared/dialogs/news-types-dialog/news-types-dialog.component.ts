import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KeyValuePairModel } from '../../models/key-value-pair.model';
import { NewsTypesService } from '../../../pages/news-types/news-types.service';

@Component({
  selector: 'app-news-types-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news-types-dialog.component.html',
  styleUrl: './news-types-dialog.component.scss'
})
export class NewsTypesDialogComponent {
  type: string = '';
  isEdited: boolean = false;

  constructor(
    public _dialog: MatDialogRef<NewsTypesDialogComponent>,
    private newsTypeService: NewsTypesService,
    @Inject(MAT_DIALOG_DATA) public data: KeyValuePairModel | null
  ) {
    if(data) {
      this.type = data.name;
      this.isEdited = true;
    }
  }

  submitType() {
    if(this.isEdited) {
      this.data!.name = this.type;
      this.newsTypeService.updateNewsType(this.data!).subscribe(
        (result) => {
          this._dialog.close(true);
        }
      )
    } else {
      this.newsTypeService.createNewsType(this.type).subscribe(
        (result) => {
          this._dialog.close(true);
        }
      )
    }
  }
}
