import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoService } from '../../../services/auto.service';
import { Auto } from '../../models/auto.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  autos: Auto[] = [];
  filteredAutos: Auto[] = [...this.autos];

  marche: string[] = [];
  carburanti: string[] = [];

  filter = {
    marca: '',
    carburante: '',
    annoMin: null as number | null,
    annoMax: null as number | null,
    prezzoMin: null as number | null,
    prezzoMax: null as number | null,
    kmMin: null as number | null,
    kmMax: null as number | null
  };

  constructor(private autoService: AutoService) {}

  ngOnInit(): void {
    this.autoService.getAll().subscribe(data => {
      // ordina per marca in ordine alfabetico
      const sorted = data.sort((a, b) => a.marca.localeCompare(b.marca));

      this.autos = sorted;
      this.filteredAutos = sorted;
      this.marche = [...new Set(sorted.map(a => a.marca))];
      this.carburanti = [...new Set(sorted.map(a => a.carburante))];
    });
  }

  applyFilters() {
    this.filteredAutos = this.autos.filter(a =>
      (!this.filter.marca || a.marca === this.filter.marca) &&
      (!this.filter.carburante || a.carburante === this.filter.carburante) &&
      (!this.filter.prezzoMin || a.prezzo >= this.filter.prezzoMin) &&
      (!this.filter.prezzoMax || a.prezzo <= this.filter.prezzoMax) &&
      (!this.filter.annoMin || a.anno >= this.filter.annoMin) &&
      (!this.filter.annoMax || a.anno <= this.filter.annoMax) &&
      (!this.filter.kmMin || a.km >= this.filter.kmMin) &&
      (!this.filter.kmMax || a.km <= this.filter.kmMax)
    );
  }

  resetFilters(): void {
    this.filter = {
      marca: '',
      carburante: '',
      annoMin: null,
      annoMax: null,
      prezzoMin: null,
      prezzoMax: null,
      kmMin: null,
      kmMax: null
    };
    this.filteredAutos = [...this.autos];
  }

  getImageUrl(filename?: string): string {
    if (!filename || filename.trim() === '') {
      return 'assets/images/no_car_image.jpg'; // fallback locale
    }
    return `${environment.apiURL}/images/${filename}`;
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/no_car_image.jpg'; // fallback se l'immagine non viene trovata
  }

}
