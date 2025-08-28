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
}
