import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule]
})
export class HomeComponent {
  heroTitle: string = "Trova l'auto dei tuoi sogni!";
  heroSubtitle: string = "Scopri la nostra selezione di auto nuove e usate con offerte imperdibili.";
  ctaText: string = "Sfoglia le auto";

  aboutTitle: string = "Chi siamo";
  aboutText: string = "Siamo esperti nella vendita di auto. La nostra missione è aiutarti a trovare la vettura perfetta.";

  services = [
    { title: "Finanziamenti", description: "Soluzioni personalizzate per acquistare la tua auto." },
    { title: "Assistenza", description: "Servizio completo post-vendita per ogni esigenza." },
    { title: "Permute", description: "Valutiamo la tua auto usata come parte del pagamento." }
  ];
}

