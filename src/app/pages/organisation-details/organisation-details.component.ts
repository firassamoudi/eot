import { Component, OnInit } from '@angular/core';
import { mapSettings } from '../../core/map-settings';
import { ActivatedRoute } from '@angular/router';
import { Organisation } from '../../core/models/organisation.model';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import { TitleService } from '../../core/services/title.service';

@Component({
  selector: 'app-organisation-details',
  templateUrl: './organisation-details.component.html',
  styleUrls: ['./organisation-details.component.scss']
})
export class OrganisationDetailsComponent implements OnInit {

  baseUrl = environment.serverUrl;
  styles = mapSettings as google.maps.MapTypeStyle[];

  moment = moment;

  organisation: Organisation;

  constructor(private route: ActivatedRoute,
              private titleService: TitleService) {
}

  ngOnInit(): void {
    this.organisation = this.route.snapshot.data.organisation[0];
    this.titleService.setTitle(this.organisation.name);
  }

  onMapReady(map: any): void {
    map.setOptions({
      fullscreenControl: false,
      streetViewControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      }
    });
  }

}
