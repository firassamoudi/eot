import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntityType } from '../../../core/enums/organisation-type.enum';
import { ApiService } from '../../../core/http/api.service';
import { MapSelectComponent } from '../../../shared/modals/map-select/map-select.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TitleService } from '../../../core/services/title.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {

  EntityType = EntityType;

  width: number;

  image: {file: File, content: string | ArrayBuffer};

  structureForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    type: [EntityType.CoworkingSpace, [Validators.required]],
    description: ['', [Validators.required]],
    founding_date: ['', [Validators.required]],
    address: this.fb.group({
      street_address: ['', [Validators.required]],
      country: ['Tunisie'],
      city: ['', [Validators.required]],
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
    advancement_stage: ['MVP', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private dialog: MatDialog,
              private router: Router,
              private titleService: TitleService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Ajouter votre structure de soutien');
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
    if (this.structureForm.valid && this.image.file) {
      const body = Object.assign({}, this.structureForm.value);
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
        latitude: this.structureForm.get('address').get('latitude').value,
        longitude: this.structureForm.get('address').get('longitude').value,
      }
    });
    dialog.afterClosed().subscribe(value => {
      this.structureForm.get('address').patchValue({
        latitude: value[0],
        longitude: value[1]
      });
    });
  }

  get mapCoordinates(): string {
    if (this.structureForm.get('address').get('latitude').value && this.structureForm.get('address').get('longitude').value) {

      const latitude = this.toDegreesMinutesAndSeconds(this.structureForm.get('address').get('latitude').value);
      const latitudeCardinal = this.structureForm.get('address').get('longitude').value >= 0 ? 'N' : 'S';

      const longitude = this.toDegreesMinutesAndSeconds(this.structureForm.get('address').get('longitude').value);
      const longitudeCardinal = this.structureForm.get('address').get('longitude').value >= 0 ? 'E' : 'W';

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
