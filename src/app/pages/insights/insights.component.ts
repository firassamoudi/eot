import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { Insight } from '../../core/models/insight.model';
import { TitleService } from '../../core/services/title.service';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {

  infography: Insight[][];
  reports: Insight[][];

  err: string;

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private titleService: TitleService) {
  }

  insightsCustomOptions: OwlOptions = {
    loop: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: false,
    navText: ['<img src="assets/images/arrow-slide-left.svg" class="arrow-slide">', '<img src="assets/images/arrow-slide-right.svg" class="arrow-slide">'],
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      1024: {
        items: 1
      }
    },
    nav: true
  };

  search = new FormControl();

  ngOnInit(): void {
    this.titleService.setTitle('Insights');
    this.infography = this.route.snapshot.data.infography.reduce((rows, key, index) => (index % 2 === 0 ? rows.push([key])
      : rows[rows.length - 1].push(key)) && rows, []);
    this.reports = this.route.snapshot.data.reports.reduce((rows, key, index) => (index % 2 === 0 ? rows.push([key])
      : rows[rows.length - 1].push(key)) && rows, []);
    this.search.valueChanges.pipe().subscribe(value => {
      this.searchInsights(value);
    });
  }


  searchInsights(keyword): void {
    this.api.searchInsights('Infographie', keyword).then(value => {
      console.log("data returned: ", value);
      this.infography = value.reduce((rows, key, index) => (index % 2 === 0 ? rows.push([key])
      : rows[rows.length - 1].push(key)) && rows, []);
    }).catch(() => {
      this.err = 'Error getting insights';
    });

    this.api.searchInsights('Rapport', keyword).then(value => {
      console.log("data returned: ", value);
      this.reports = value.reduce((rows, key, index) => (index % 2 === 0 ? rows.push([key])
      : rows[rows.length - 1].push(key)) && rows, []);
    }).catch(() => {
      this.err = 'Error getting insights';
    });
  }

}
