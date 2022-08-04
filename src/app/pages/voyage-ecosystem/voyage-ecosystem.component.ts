import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MindsetModalComponent } from './mindset-modal/mindset-modal.component';
import { ActivatedRoute } from '@angular/router';
import { Voyage } from '../../core/models/voyage.model';
import { TitleService } from '../../core/services/title.service';

@Component({
  selector: 'app-voyage-ecosystem',
  templateUrl: './voyage-ecosystem.component.html',
  styleUrls: ['./voyage-ecosystem.component.scss']
})
export class VoyageEcosystemComponent implements OnInit {

  voyages: Voyage[];

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private titleService: TitleService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Voyage dans l\'écosystème');
    this.voyages = this.route.snapshot.data.voyages;
  }

  openEcosystemModal(): void {
    this.dialog.open(MindsetModalComponent, {
      disableClose: false,
      panelClass: 'mindset-dialog',
      data: this.voyages
    });
  }

}
