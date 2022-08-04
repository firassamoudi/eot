import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Insight } from '../../core/models/insight.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from '../../../environments/environment';
import { TitleService } from '../../core/services/title.service';

@Component({
  selector: 'app-insight-details',
  templateUrl: './insight-details.component.html',
  styleUrls: ['./insight-details.component.scss']
})
export class InsightDetailsComponent implements OnInit {

  baseUrl = environment.serverUrl;

  insight: Insight;

  smallOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: true,
    navText: ['<img alt="left arrow" src="assets/icons/nav-left.svg">', '<img alt="right arrow" src="assets/icons/nav-right.svg">'],
    navSpeed: 700,
    autoplay: false,
    items: 1,
    responsive: {
      0: {
        nav: false
      },
      1024: {
        nav: true
      }
    }
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: false,
    nav: false,
    items: 1
  };

  constructor(private route: ActivatedRoute,
              private titleService: TitleService) {
  }

  ngOnInit(): void {
    this.insight = this.route.snapshot.data.insight[0];
    this.titleService.setTitle(this.insight.title);
  }

}
