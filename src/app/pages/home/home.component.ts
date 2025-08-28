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
  aboutText: string = "Antonio e Andrea sono appassionati di auto e da anni si dedicano con competenza alla vendita di veicoli nuovi e usati. La loro missione è aiutarti a trovare l’auto perfetta, offrendoti un servizio trasparente, professionale e su misura per le tue esigenze.";


  services = [
      {
        title: "Finanziamenti",
        description: "Offriamo soluzioni di finanziamento personalizzate: rate flessibili, tassi competitivi e possibilità di scegliere tra più piani di pagamento per adattarsi al tuo budget e alle tue esigenze."
      },
      {
        title: "Assistenza",
        description: "Servizio post-vendita completo: manutenzione programmata, riparazioni rapide e supporto tecnico dedicato per garantirti sempre la massima sicurezza e affidabilità della tua auto."
      },
      {
        title: "Permute",
        description: "Valutiamo la tua auto usata in modo trasparente e competitivo, permettendoti di utilizzarla come parte del pagamento per l’acquisto del tuo nuovo veicolo, senza complicazioni."
      },
      {
        title: "Garanzia estesa",
        description: "Opzione di garanzia estesa che copre guasti e malfunzionamenti, offrendoti tranquillità e protezione aggiuntiva anche dopo l’acquisto della tua auto."
      },
      {
        title: "Consulenza assicurativa",
        description: "Il nostro team ti aiuta a scegliere la polizza assicurativa più adatta, con preventivi personalizzati e soluzioni complete per tutelare te e la tua auto."
      },
      {
        title: "Test drive personalizzato",
        description: "Prenota un test drive su misura, prova la tua auto ideale in tutte le condizioni e scopri tutte le funzionalità prima di prendere la decisione finale."
      }
    ];
}

