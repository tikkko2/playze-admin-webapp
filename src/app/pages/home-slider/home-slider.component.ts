import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  CdkDragHandle,
  CdkDragPreview,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SliderService } from '../../core/services/slider.service';

interface ImageItem {
  file: File;
  url: string;
  id: string;
  redirectUrl?: string;
  isPublic: boolean;
  serverId?: string; // To store the ID from the server after upload
}

@Component({
  selector: 'app-home-slider',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    CdkDragPreview,
  ],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.scss',
})
export class HomeSliderComponent implements OnInit {
  uploadForm!: FormGroup;
  images: ImageItem[] = [];
  isUploading = false;
  uploadedImages: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private sliderService: SliderService
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      imageFiles: [null],
    });
    this.loadExistingSliders();
  }

  private loadExistingSliders() {
    this.sliderService.getSliders().subscribe({
      next: (response) => {
        this.uploadedImages = response;
      },
      error: (error) => {
        this.snackBar.open('Failed to load existing sliders', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const files = Array.from(input.files);
    const validFiles = files.filter((file) => file.type.startsWith('image/'));

    if (validFiles.length !== files.length) {
      this.snackBar.open('Only image files are allowed', 'Close', {
        duration: 3000,
      });
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const imageItem: ImageItem = {
            file,
            url: e.target.result as string,
            id: this.generateUniqueId(),
            redirectUrl: '',
            isPublic: false, // Default to private
          };
          this.images.push(imageItem);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset the input so the same file can be selected again if needed
    input.value = '';
  }

  drop(event: CdkDragDrop<ImageItem[]>): void {
    // Save reference to the item being dragged
    const draggedItem = this.images[event.previousIndex];
    
    // Perform the move
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
    
    // Log the new order for debugging
    console.log('Image reordered:', {
      item: draggedItem.id,
      from: event.previousIndex,
      to: event.currentIndex
    });
  }

  async uploadImages(): Promise<void> {
    if (this.images.length === 0) {
      this.snackBar.open('Please select at least one image', 'Close', {
        duration: 3000,
      });
      return;
    }

    this.isUploading = true;

    try {
      for (const image of this.images) {
        const formData = new FormData();
        formData.append('file', image.file);
        formData.append('redirectUrl', image.redirectUrl || '');
        formData.append('isPublic', image.isPublic.toString());

        const response = await this.sliderService.createSlider(formData).toPromise();
        image.serverId = response.id;
      }

      this.snackBar.open('All images uploaded successfully!', 'Close', {
        duration: 3000,
      });
      this.images = []; // Clear the list after successful upload
      this.loadExistingSliders(); // Refresh the list of uploaded images
    } catch (error) {
      this.snackBar.open('Error uploading images', 'Close', {
        duration: 3000,
      });
    } finally {
      this.isUploading = false;
    }
  }

  async deleteImage(index: number): Promise<void> {
    const image = this.images[index];
    if (image.serverId) {
      try {
        await this.sliderService.deleteSlider(image.serverId).toPromise();
        this.snackBar.open('Image deleted successfully', 'Close', {
          duration: 3000,
        });
        this.loadExistingSliders(); // Refresh the list of uploaded images
      } catch (error) {
        this.snackBar.open('Error deleting image', 'Close', {
          duration: 3000,
        });
      }
    }
    this.images.splice(index, 1);
  }

  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}