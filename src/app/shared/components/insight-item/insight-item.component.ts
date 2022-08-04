import { Component, Input, OnInit } from '@angular/core';
import { Insight } from '../../../core/models/insight.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-insight-item',
  templateUrl: './insight-item.component.html',
  styleUrls: ['./insight-item.component.scss']
})
export class InsightItemComponent implements OnInit {

  baseUrl = environment.serverUrl;

  @Input() insight: Insight;

  constructor() { }

  ngOnInit(): void {
  }

}
