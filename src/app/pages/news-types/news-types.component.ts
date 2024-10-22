import { Component, inject, OnInit } from '@angular/core';
import { NewsTypesService } from './news-types.service';
import { CommonModule } from '@angular/common';
import { KeyValuePairModel } from '../../shared/models/key-value-pair.model';

@Component({
  selector: 'app-news-types',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-types.component.html',
  styleUrl: './news-types.component.scss'
})
export class NewsTypesComponent implements OnInit {
  public newsTypesService = inject(NewsTypesService);
  filterText: string = ''

  ngOnInit() {
  }

  initTypes(){
    this.newsTypesService.getNewsTypes(this.filterText).subscribe((result) =>{
      const types = result.parameters[result.key] as KeyValuePairModel[];
      this.newsTypesService.newsTypes.set(types)
    });
  }
}
