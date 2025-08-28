import { Component, OnInit } from '@angular/core';
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
  editingAuto: Auto | null = null;
  formAuto: Partial<Auto> = {};
  isModalOpen = false;
  selectedFile?: File;

  constructor(private autoService: AutoService) {
    this.loadAutos();
  }

  loadAutos() {
    this.autoService.getAll().subscribe(data => {
      // Ordina per ID crescente
      this.autos = data.sort((a, b) => (a.id! - b.id!));
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

  // Riceve i dati salvati dalla modale
  handleSave(event: { auto: Partial<Auto>, file?: File }) {
    const { auto, file } = event;

    if (this.editingAuto) {
      this.autoService.update(this.editingAuto.id!, auto as Auto, file).subscribe(() => {
        this.loadAutos();
        this.closeModal();
      });
    } else {
      this.autoService.create(auto as Auto, file).subscribe(() => {
        this.loadAutos();
        this.closeModal();
      });
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
