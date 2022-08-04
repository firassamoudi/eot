import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { TitleService } from '../../core/services/title.service';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  fruits: Fruit[] = [
    { name: 'Graphic designer' },
    { name: 'Motion designer' }
  ];

  regions: Fruit[] = [
    { name: 'Sfax' },
    { name: 'Sousse' },
    { name: 'Monastir' }
  ];

  minValue = 1500;
  maxValue = 5000;
  options: Options = {
    floor: 0,
    ceil: 10000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Ceil:
          return `${value}<b>DT</b>`;
        case LabelType.Floor:
          return `${value}<b>DT</b>`;
        default:
          return `${value}`;
      }
    }
  };

  expMinValue = 4;
  expMaxValue = 6;
  expOptions: Options = {
    floor: 0,
    ceil: 10,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Ceil:
          return `${value}<b> ans</b>`;
        case LabelType.Floor:
          return `${value}<b> ans</b>`;
        default:
          return `${value}`;
      }
    }
  };

  constructor(private titleService: TitleService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Jobs');
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

}
