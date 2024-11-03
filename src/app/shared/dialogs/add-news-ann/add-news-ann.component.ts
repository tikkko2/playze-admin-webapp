import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NewsTypesService } from '../../../pages/news-types/news-types.service';
import { Subject } from 'rxjs';
import { KeyValuePairModel } from '../../models/key-value-pair.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PlEditorComponent } from '../../components/pl-editor/pl-editor.component';
import { AnnouncementService } from '../../../pages/announcement/announcement.service';

@Component({
  selector: 'app-add-news-ann',
  standalone: true,
  imports: [CommonModule, FormsModule, PlEditorComponent, ReactiveFormsModule],
  templateUrl: './add-news-ann.component.html',
  styleUrl: './add-news-ann.component.scss',
})
export class AddNewsAnnComponent {
  public newsTypesService = inject(NewsTypesService);
  public announcementService = inject(AnnouncementService);
  private _builder = inject(FormBuilder);
  newsForm!: FormGroup;
  private searchSubject = new Subject<string>();
  filterText: string = '';
  selectedImage: string | null = null;
  isPublic: boolean = false;
  toggle: boolean = false;
  games: KeyValuePairModel[] = [];
  selectedGames: KeyValuePairModel[] = [];

  ngOnInit() {
    this.initTypes();
    this.initForm();
    this.initGames();
  }

  initForm() {
    this.newsForm = this._builder.group({
      headline: ['', [Validators.required, Validators.maxLength(300)]],
      primaryKeyword: ['', [Validators.required, Validators.maxLength(200)]],
      typeId: ['', [Validators.required]],
      relatedGames: ['', [Validators.required]],
      contentHtml: ['', [Validators.required]],
      file: ['', [Validators.required]],
    });
  }

  submitNews() {}

  addGames(game: KeyValuePairModel) {
    var existingGames = this.selectedGames.find((x) => game.id === x.id);
    if (existingGames) return;
    this.selectedGames.push(game);
  }

  removeGame(game: KeyValuePairModel) {
    this.selectedGames = this.selectedGames.filter((x) => game.id != x.id);
  }

  filterGames() {
    this.announcementService.getGames(this.filterText).subscribe((result) => {
      this.games = result.parameters[result.key] as KeyValuePairModel[];
    });
  }

  initTypes() {
    this.newsTypesService.getNewsTypes(this.filterText).subscribe((result) => {
      const types = result.parameters[result.key] as KeyValuePairModel[];
      this.newsTypesService.newsTypes.set(types);
    });
  }

  initGames() {
    this.announcementService.getGames('').subscribe((result) => {
      this.games = result.parameters[result.key] as KeyValuePairModel[];
    });
  }

  togglePrivacy() {
    this.isPublic = !this.isPublic;
  }

  show() {
    this.toggle = !this.toggle;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(file);
    if (file && file.type.startsWith('image/')) {
      // Create a URL for the image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
