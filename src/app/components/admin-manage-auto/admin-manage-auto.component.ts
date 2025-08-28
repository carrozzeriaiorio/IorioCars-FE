import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() save = new EventEmitter<{ auto: Partial<Auto>, file?: File }>();
  @Output() close = new EventEmitter<void>();

  apiUrl = environment.apiURL;

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0] ?? undefined;
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
    return '';
  }
}
