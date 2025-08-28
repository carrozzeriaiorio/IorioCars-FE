import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auto } from '../app/models/auto.model';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  private apiUrl = `${environment.apiURL}/api/auto`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Auto[]> {
    return this.http.get<Auto[]>(this.apiUrl);
  }

  getById(id: number): Observable<Auto> {
    return this.http.get<Auto>(`${this.apiUrl}/${id}`);
  }

  // Crea una nuova auto
  create(auto: Auto, file?: File): Observable<Auto> {
    const formData = new FormData();
    formData.append('auto', new Blob([JSON.stringify(auto)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<Auto>(this.apiUrl, formData);
  }

  // Aggiorna un’auto esistente
  update(id: number, auto: Auto, file?: File): Observable<Auto> {
    const formData = new FormData();
    formData.append('auto', new Blob([JSON.stringify(auto)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<Auto>(`${this.apiUrl}/${id}`, formData);
  }

  // Elimina un’auto
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
