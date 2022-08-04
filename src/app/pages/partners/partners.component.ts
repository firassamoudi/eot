import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partner } from '../../core/models/partner.model';
import { environment } from '../../../environments/environment';
import { TitleService } from '../../core/services/title.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  baseUrl = environment.serverUrl;

  partners: Partner[];

  constructor(private route: ActivatedRoute,
              private titleService: TitleService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Partenaires');
    this.partners = this.route.snapshot.data.partners;
    console.log(this.partners);
    
  }

}
