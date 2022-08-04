import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import { ApiService } from '../../core/http/api.service';
import { Stat } from '../../core/models/stat.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Insight } from '../../core/models/insight.model';
import { TitleService } from '../../core/services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    nav: false,
    responsive: {
      0: {
        items: 1
      }
    }
  };
  insightsCustomOptions: OwlOptions = {
    loop: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    navText: ['<img alt="left arrow" src="assets/images/arrow-slide-left.svg" class="arrow-slide">', '<img alt="right arrow" src="assets/images/arrow-slide-right.svg" class="arrow-slide">'],
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      1024: {
        items: 2
      }
    },
    nav: true
  };

  keyword: string;

  stats: Stat[];
  insights: Insight[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleService: TitleService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Accueil');
    this.stats = this.route.snapshot.data.stats;
    
    
    this.insights = this.route.snapshot.data.insights;
    this.insights = this.insights.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    console.log(this.insights);
  }

  search(): void {
    if (this.keyword) {
      this.router.navigate(['/map'], {
        queryParams: {
          keyword: this.keyword
        }
      });
    }
  }

}
