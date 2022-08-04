import {Component, ElementRef, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.scss']
})
export class MapSelectComponent implements OnInit {

  latitude: number;
  longitude: number;
  mapLatitude: number;
  mapLongitude: number;
  address: string;
  zoom = 15;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              public dialogRef: MatDialogRef<MapSelectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.latitude = 36.8620179;
    this.longitude = 10.2159726;
    this.mapLatitude = 36.8620179;
    this.mapLongitude = 10.2159726;
    this.address = '';

    if (this.data) {
      if (this.data.longitude && this.data.latitude) {
        this.longitude = this.data.longitude;
        this.mapLongitude = this.data.longitude;
        this.latitude = this.data.latitude;
        this.mapLatitude = this.data.latitude;
      }
    }

    this.mapsAPILoader.load().then(() => {
      // @ts-ignore
      this.geoCoder = new google.maps.Geocoder();
      // @ts-ignore
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // @ts-ignore
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.mapLatitude = +place.geometry.location.lat().toFixed(7);
          this.latitude = this.mapLatitude;
          this.mapLongitude = +place.geometry.location.lng().toFixed(7);
          this.longitude = this.mapLongitude;
        });
      });
    });
  }

  onMapClicked(event): void {
    this.latitude = +event.coords.lat.toFixed(7);
    this.longitude = +event.coords.lng.toFixed(7);
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
      const latLng = {lat: this.latitude, lng: this.longitude};
      const that = this;
      this.geoCoder.geocode({location: latLng}, (results) => {
        if (results[0]) {
          that.address = results[0].formatted_address;
        } else {
          console.log('No results found');
        }
      });
    });
  }

  confirmLocation(): void {
    if (this.latitude != null && this.longitude != null) {
      this.dialogRef.close([+this.latitude.toFixed(7), +this.longitude.toFixed(7)]);
    }
  }

  printOnDragEnd(event: any): any {
    this.latitude = event.latLng.lat();
    this.longitude = event.latLng.lng();
  }

}
