import { Component } from '@angular/core';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { editable } from '../../models/editor-config';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pl-editor',
  standalone: true,
  imports: [EditorModule, FormsModule],
  templateUrl: './pl-editor.component.html',
  styleUrl: './pl-editor.component.scss',
})
export class PlEditorComponent {
  editorConfig = editable;
  content!: string;
}
