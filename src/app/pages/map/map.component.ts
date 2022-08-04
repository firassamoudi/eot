import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organisation } from '../../core/models/organisation.model';
import { ClusterIconStyle } from '@google/markerclustererplus';
import { EntityType } from '../../core/enums/organisation-type.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { OrganisationModalComponent } from '../../shared/modals/organisation-modal/organisation-modal.component';
import { mapSettings } from '../../core/map-settings';
import { TitleService } from '../../core/services/title.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  EntityType = EntityType;
  baseUrl = environment.serverUrl;

  coworkingPin = {
    url: 'assets/map-pins/pin-coworking.svg',
    scaledSize: {
      height: 50,
      width: 50
    }
  } as google.maps.Icon;

  investorPin = {
    url: 'assets/map-pins/pin-investor.svg',
    scaledSize: {
      height: 50,
      width: 50
    }
  } as google.maps.Icon;

  mediaPin = {
    url: 'assets/map-pins/pin-media.svg',
    scaledSize: {
      height: 50,
      width: 50
    }
  } as google.maps.Icon;

  startupPin = {
    url: 'assets/map-pins/pin-startup.svg',
    scaledSize: {
      height: 50,
      width: 50
    }
  } as google.maps.Icon;

  iconStyle = [
    {
      width: 111,
      height: 111,
      url: 'assets/map-pins/m5.png',
      textColor: '#FFFFFF',
      textLineHeight: 111,
      textSize: 22,
      fontFamily: '\'Ambit\', sans-serif',
      fontWeight: '600'
    }
  ] as ClusterIconStyle[];

  styles = mapSettings as google.maps.MapTypeStyle[];

  organisations: Organisation[];
  filteredOrganisations: Organisation[];
  regions: string[] =
    [
      'Ariana',
      'Tunis',
      'Manouba',
      'Ben Arous',
      'Béja',
      'Siliana',
      'Le Kef',
      'Jendouba',
      'Bizerte',
      'Nabeul',
      'Zaghouan',
      'Kebili',
      'Sousse',
      'Mahdia',
      'Monastir',
      'Sfax',
      'Gabès',
      'Médenine',
      'Tataouine',
      'Tozeur',
      'Gafsa',
      'Sidi Bouzid',
      'Kasserine',
      'Kairouan'
    ];

  sectors: string[] = [
    'E-commerce',
    'Marketplace',
    'Fintech',
    'Insurtech',
    'Blockchain',
    'Cryptocurrency',
    'Edtech',
    'Healthtech',
    'Biotech',
    'Software',
    'Big Data',
    'Analytics',
    'Robotics',
    'IoT',
    'New food',
    'Media',
    'Gaming',
    'Other creative content',
    'Creative industry',
    'Transport',
    'Logistics',
    'Delivery',
    'Social platform',
    'AI',
    'Energy',
    'Cleantech',
    'Agritech',
    'Mobility',
    'Hometech',
    'Waste management',
    'Talent & Job platforms ',
    'Legaltech',
    'Travel & Tourism',
    'Industry 4.0'
  ];

  keyword: string;
  showResults: boolean;
  searchOrganisations: Organisation[];

  filterForm: FormGroup = this.fb.group({
    keyword: [''],
    type: [''],
    region: [''],
    sector: ['']
  });

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private titleService: TitleService) {
}

  ngOnInit(): void {
    this.titleService.setTitle('Map');
    this.organisations = this.route.snapshot.data.organisations;
    this.organisations.forEach(organisation => {
      organisation.icon = this.getIconUrl(organisation);
    });
    this.filteredOrganisations = this.organisations.map(elm => elm);

    this.filterForm.valueChanges.subscribe(({keyword, type, region}) => {
      this.filteredOrganisations = this.organisations.filter(elm => {
        let state = true;
        if (type) {
          state = state && (elm.type === type);
        }
        if (region) {
          state = state && (elm.address.city === region);
        }
        if (keyword) {
          state = state && (elm.name.toLowerCase().includes(keyword.toLowerCase())
            || elm.description.toLowerCase().includes(keyword.toLowerCase()));
        }
        return state;
      });
      this.showResults = true;
    });

    if (this.route.snapshot.queryParams.keyword) {
      this.filterForm.patchValue({
        keyword: this.route.snapshot.queryParams.keyword
      });

    }
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

  count(type: EntityType): number {
    return this.organisations.filter(elm => elm.type === type).length;
  }

  openOrganisationDetailModal(organisation: Organisation): void {
    this.dialog.open(OrganisationModalComponent, {
      disableClose: false,
      panelClass: 'custom-mat-dialog',
      data: {
        organisation
      }
    });
  }

  setType(type: EntityType): void {
    if (this.filterForm.get('type').value === type) {
      this.filterForm.patchValue({ type: '' });
      this.showResults = false;
    } else {
      this.filterForm.patchValue({ type });
      this.showResults = true;
    }
  }

  getIconUrl(organization: Organisation): google.maps.Icon {
    const icon = {
      url: '',
      scaledSize: {
        height: 60,
        width: 40
      }
    };
    switch (organization.type) {
      case EntityType.Accelerator:
        icon.url = 'assets/map-pins/pin-accelerator.png';
        break;
      case EntityType.CoworkingSpace:
        icon.url = 'assets/map-pins/pin-coworking.png';
        break;
      case EntityType.Event:
        icon.url = 'assets/map-pins/pin-event.png';
        break;
      case EntityType.Incubator:
        icon.url = 'assets/map-pins/pin-incubator.png';
        break;
      case EntityType.Investor:
        icon.url = 'assets/map-pins/pin-investor.png';
        break;
      case EntityType.Job:
        icon.url = 'assets/map-pins/pin-job.png';
        break;
      case EntityType.Media:
        icon.url = 'assets/map-pins/pin-media.png';
        break;
      case EntityType.Project:
        icon.url = 'assets/map-pins/pin-project.png';
        break;
      case EntityType.PublicService:
        icon.url = 'assets/map-pins/pin-public-service.png';
        break;
      case EntityType.Startup:
        icon.url = 'assets/map-pins/pin-startup.png';
        break;
      case EntityType.Structures:
        icon.url = 'assets/map-pins/pin-structure.png';
        break;
    }
    return icon as google.maps.Icon;
  }

}
