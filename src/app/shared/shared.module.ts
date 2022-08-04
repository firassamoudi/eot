import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightItemComponent } from './components/insight-item/insight-item.component';
import {RouterModule} from '@angular/router';
import { JobItemComponent } from './components/job-item/job-item.component';
import { OrganisationModalComponent } from './modals/organisation-modal/organisation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MapSelectComponent } from './modals/map-select/map-select.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [InsightItemComponent, JobItemComponent, OrganisationModalComponent, MapSelectComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        AngularSvgIconModule,
        AgmCoreModule
    ],
  exports: [InsightItemComponent, JobItemComponent]
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Shared module in the AppModule only.`);
    }
  }
}
