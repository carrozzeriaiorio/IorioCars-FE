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
  aboutText: string = "Antonio e Andrea lavorano e si dedicano al settore delle auto da anni. Grazie alla loro esperienza, sono in grado di guidarti nella scelta del veicolo più adatto alle tue esigenze, garantendo professionalità, trasparenza e un servizio su misura per ogni cliente.";

  services = [
    {
      title: "Permute",
      description: "Valutiamo la tua auto usata in modo trasparente e competitivo, permettendoti di utilizzarla come parte del pagamento per l’acquisto del tuo nuovo veicolo, senza complicazioni."
    },
    {
      title: "Accessori, personalizzazioni e carrozzeria",
      description: "Personalizza la tua auto con accessori originali, pacchetti estetici e funzionali, approfitta dei servizi di carrozzeria per mantenerla sempre perfetta e unica nel tuo stile."
    },
    {
      title: "Test drive personalizzato",
      description: "Prenota un test drive su misura, prova la tua auto ideale in tutte le condizioni e scopri tutte le funzionalità prima di prendere la decisione finale."
    }
  ];
}

