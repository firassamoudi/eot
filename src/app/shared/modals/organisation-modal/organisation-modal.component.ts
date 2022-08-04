import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Organisation } from '../../../core/models/organisation.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-organisation-modal',
  templateUrl: './organisation-modal.component.html',
  styleUrls: ['./organisation-modal.component.scss']
})
export class OrganisationModalComponent implements OnInit {

  baseUrl = environment.serverUrl;

  organisation: Organisation;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<OrganisationModalComponent>) { }

  ngOnInit(): void {
    if (this.data && this.data.organisation) {
      this.organisation = this.data.organisation;
    } else {
      this.dialogRef.close();
    }
  }

}
