import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Voyage } from '../../../core/models/voyage.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mindset-modal',
  templateUrl: './mindset-modal.component.html',
  styleUrls: ['./mindset-modal.component.scss']
})
export class MindsetModalComponent implements OnInit {

  baseUrl = environment.serverUrl;

  voyages: Voyage[];
  step = 0;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    if (this.data) {
      this.voyages = this.data;
    }
  }

  incrementStep(): void {
    this.step++;
  }

  decrementStep(): void {
    this.step--;
  }

}
