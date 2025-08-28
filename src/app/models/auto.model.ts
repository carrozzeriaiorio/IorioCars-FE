export interface Auto {
  id?: number;
  titolo: string;
  marca: string;
  modello: string;
  anno: number;
  prezzo: number;
  km: number;
  carburante: string;
  descrizione?: string;
  immagine?: string; // nome file o URL relativo
}
