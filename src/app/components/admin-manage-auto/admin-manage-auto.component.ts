import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auto } from '../../models/auto.model'; // aggiorna il path se serve
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-admin-manage-auto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-manage-auto.component.html',
  styleUrls: ['./admin-manage-auto.component.css']
})
export class AdminManageAutoComponent {
  @Input() modalOpen = false;             // Controlla visibilità della modale
  @Input() editingAuto: Auto | null = null;
  @Input() formAuto: Partial<Auto> = {};  // Dati del form

  selectedFile: File | undefined;
  previewUrl: string = '';

  @Output() save = new EventEmitter<{ auto: Partial<Auto>, file?: File }>();
  @Output() close = new EventEmitter<void>();

  apiUrl = environment.apiURL;

  constructor(private cdr: ChangeDetectorRef) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
     if (file) {
       this.selectedFile = file;
       this.previewUrl = URL.createObjectURL(file);
       // forza rilevamento dei cambiamenti
       this.cdr.detectChanges();
     }
  }

  ngOnChanges() {
    // Aggiorna preview all'apertura della modale
    if (this.editingAuto?.immagine && !this.selectedFile) {
      this.previewUrl = `${this.apiUrl}/images/${this.editingAuto.immagine}`;
    } else if (!this.editingAuto?.immagine) {
      this.previewUrl = 'assets/images/no_car_image.jpg';
    }
  }

  // Rimuove immagine già presente
  removeImage() {
    if (this.editingAuto) {
      this.editingAuto.immagine = ''; // reset del campo
      this.previewUrl = 'assets/images/no_car_image.jpg';
      this.selectedFile = undefined;
      this.cdr.detectChanges();
    }
  }

  submit() {
    this.save.emit({ auto: this.formAuto, file: this.selectedFile });
  }

  cancel() {
    this.close.emit();
  }

  getPreview(): string {
    if (this.selectedFile) {
     return window.URL.createObjectURL(this.selectedFile);
    }
    if (this.editingAuto?.immagine) {
     return `${this.apiUrl}/images/${this.editingAuto.immagine}`;
    }
    return 'assets/images/no_car_image.jpg';
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/no_car_image.jpg';
  }
}
