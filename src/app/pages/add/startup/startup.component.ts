import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/http/api.service';
import { EntityType } from '../../../core/enums/organisation-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { MapSelectComponent } from '../../../shared/modals/map-select/map-select.component';
import { Router } from '@angular/router';
import { TitleService } from '../../../core/services/title.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {

  startupForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    type: [EntityType.Startup, [Validators.required]],
    description: ['', [Validators.required]],
    founding_date: ['', [Validators.required]],
    address: this.fb.group({
      street_address: ['', [Validators.required]],
      country: ['Tunisie'],
      city: ['Tunis', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    }),
    contact: this.fb.group({
      website: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]]
    }),
    social: this.fb.group({
      linkedin: [''],
      facebook: [''],
      twitter: [''],
      instagram: ['']
    }),
    sector: ['Média', [Validators.required]],
    advancement_stage: ['MVP', [Validators.required]],
    cofounders: ['', [Validators.required, Validators.min(0)]],
    funding: ['', [Validators.required, Validators.min(0)]],
    employees: ['', [Validators.required, Validators.min(0)]]
  });

  image: {file: File, content: string | ArrayBuffer};

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
    'Talent & Job platforms',
    'Legaltech',
    'Travel & Tourism',
    'Industry 4.0'
  ];

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private dialog: MatDialog,
              private router: Router,
              private titleService: TitleService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Ajouter votre startup');
  }

  onImageSelection(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      let file: File;
      [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.image = {
          file,
          content: reader.result
        };
      };
    }
  }

  submit(): void {
    if (this.startupForm.valid && this.image.file) {
      const body = Object.assign({}, this.startupForm.value);
      console.log(body);
       this.api.addOrganisation(body).then(response => {
         this.api.uploadOrganisationLogo(response.id, this.image.file).then(() => {
           console.log('Startup ajoutée avec succès');
           this.router.navigate(['/organisation', response.id]);
         }).catch(() => {
           console.error('ERROR: Unable to upload image');
         });
       }).catch(() => {
         console.error('ERROR: Unable to add startup');
       });
    }
  }

  selectMapPin(): void {
    const dialog = this.dialog.open(MapSelectComponent, {
      disableClose: false,
      panelClass: 'custom-mat-dialog',
      data: {
        latitude: this.startupForm.get('address').get('latitude').value,
        longitude: this.startupForm.get('address').get('longitude').value,
      }
    });
    dialog.afterClosed().subscribe(value => {
      this.startupForm.get('address').patchValue({
        latitude: value[0],
        longitude: value[1]
      });
    });
  }

  get mapCoordinates(): string {
    if (this.startupForm.get('address').get('latitude').value && this.startupForm.get('address').get('longitude').value) {

      const latitude = this.toDegreesMinutesAndSeconds(this.startupForm.get('address').get('latitude').value);
      const latitudeCardinal = this.startupForm.get('address').get('longitude').value >= 0 ? 'N' : 'S';

      const longitude = this.toDegreesMinutesAndSeconds(this.startupForm.get('address').get('longitude').value);
      const longitudeCardinal = this.startupForm.get('address').get('longitude').value >= 0 ? 'E' : 'W';

      return `${latitude} ${latitudeCardinal} ${longitude} ${longitudeCardinal}`;
    } else {
      return '';
    }
  }

  toDegreesMinutesAndSeconds(coordinate): string {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return `${degrees}°${minutes}'${seconds}"`;
  }

}
