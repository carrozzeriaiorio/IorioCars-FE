import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutoService } from '../../../services/auto.service';
import { Auto } from '../../models/auto.model';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-auto-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auto-detail.component.html',
  styleUrls: ['./auto-detail.component.css']
})
export class AutoDetailComponent implements OnInit {
  auto?: Auto;

  constructor(private route: ActivatedRoute, private autoService: AutoService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.autoService.getById(id).subscribe(data => this.auto = data);
  }

  getImageUrl(filename?: string): string {
    if (!filename) return ''; // fallback se manca
    return `${environment.apiURL}/images/${filename}`;
  }
}

