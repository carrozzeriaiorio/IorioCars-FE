import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoService } from '../../../services/auto.service';
import { Auto } from '../../models/auto.model';
import { RouterModule } from '@angular/router';
import { AdminManageAutoComponent } from './../admin-manage-auto/admin-manage-auto.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AdminManageAutoComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  autos: Auto[] = [];
  searchTerm: string = '';
  filteredAutos: Auto[] = [];
  editingAuto: Auto | null = null;
  formAuto: Partial<Auto> = {};
  isModalOpen = false;
  selectedFile?: File;
  loading = false;

  constructor(private autoService: AutoService, private cdr: ChangeDetectorRef) {
    this.loadAutos();
  }

  loadAutos() {
    this.autoService.getAll().subscribe(data => {
      // Ordina per marca
      this.autos = data.sort((a, b) => a.marca.localeCompare(b.marca));
      this.filteredAutos = [...this.autos];
    });
  }

  // Apre modale per aggiungere auto
  openModal(auto?: Auto) {
    if (auto) {
      this.editingAuto = auto;
      this.formAuto = { ...auto }; // copia dell'auto selezionata
    } else {
      this.editingAuto = null;
      this.formAuto = {};
    }
    this.selectedFile = undefined; // reset del file
    this.isModalOpen = true;
  }

  // Chiude la modale
  closeModal() {
    this.isModalOpen = false;
    this.editingAuto = null;
    this.formAuto = {};
    this.selectedFile = undefined;
  }

  filterAutos() {
    if (!this.searchTerm.trim()) {
      this.filteredAutos = [...this.autos];
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredAutos = this.autos.filter(auto =>
      auto.titolo.toLowerCase().includes(term)
    );
  }

  // Riceve i dati salvati dalla modale
  handleSave(event: { auto: Partial<Auto>, file?: File, removeImage?: boolean }) {
    this.loading = true;
    this.cdr.detectChanges();
    const { auto, file, removeImage } = event;

    try {
      const request$ = this.editingAuto
        ? this.autoService.update(this.editingAuto.id!, auto as Auto, file)
        : this.autoService.create(auto as Auto, file);

      request$.subscribe({
        next: () => {
          this.loadAutos();
          this.closeModal();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: err => {
          alert(err.message || 'Errore durante l’operazione.');
          this.loading = false; // rimuove overlay
          this.cdr.detectChanges();
        }
      });

    } catch (err: any) {
      alert(err.message || 'Errore sconosciuto.');
    }
  }

  // Elimina auto con conferma
  deleteAuto(id: number) {
    if (!confirm('Sei sicuro di voler eliminare questa auto?')) return;

    this.autoService.delete(id).subscribe({
      next: () => this.loadAutos(),
      error: (err) => console.error('Errore eliminazione auto', err)
    });
  }
}
