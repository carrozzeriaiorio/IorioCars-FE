import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFile: File | undefined;
  previewUrl: string = '';
  loading = false;

  @Output() save = new EventEmitter<{ auto: Partial<Auto>, file?: File, removeImage?: boolean }>();
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
    if (this.modalOpen) {
      if (this.selectedFile) {
        // resettare input file se necessario
        this.fileInput.nativeElement.value = '';
        this.selectedFile = undefined;
      }

      if (this.editingAuto?.immagine) {
        this.previewUrl = `${this.apiUrl}/images/${this.editingAuto.immagine}`;
      } else {
        this.previewUrl = 'assets/images/no_car_image.jpg';
      }

      // forza il rilevamento
      this.cdr.detectChanges();
    }
  }

  // Rimuove immagine già presente
  removeImage() {
    this.selectedFile = undefined;
    this.previewUrl = 'assets/images/no_car_image.jpg';
    this.cdr.detectChanges();
  }

  submit(form: any) {
    if (form.invalid) {
      const errors: string[] = [];

      if (form.controls['titolo']?.invalid) errors.push('Titolo mancante');
      if (form.controls['marca']?.invalid) errors.push('Marca mancante');
      if (form.controls['modello']?.invalid) errors.push('Modello mancante');
      if (form.controls['anno']?.invalid) errors.push('Anno mancante o non valido');
      if (form.controls['prezzo']?.invalid) errors.push('Prezzo mancante o non valido');
      if (form.controls['km']?.invalid) errors.push('Km mancante');
      if (form.controls['carburante']?.invalid) errors.push('Carburante mancante');
      if (!this.selectedFile) errors.push('Immagine mancante');

      alert('Campi obbligatori mancanti:\n' + errors.join('\n'));
      return;
    }

    this.loading = false;
    this.save.emit({ auto: this.formAuto, file: this.selectedFile});
  }

  cancel() {
    this.close.emit();
  }

  getPreview(): string {
    if (this.selectedFile) return URL.createObjectURL(this.selectedFile);
    if (this.editingAuto?.immagine) return `${this.apiUrl}/images/${this.editingAuto.immagine}`;
    return 'assets/images/no_car_image.jpg';
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/no_car_image.jpg';
  }
}
