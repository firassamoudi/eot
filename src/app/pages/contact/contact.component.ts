import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitleService } from '../../core/services/title.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private titleService: TitleService, private fb: FormBuilder) {
  }
  
  validateEmail = true;

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    mail: ['', [Validators.required], Validators.email],
    message: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.titleService.setTitle('Contact');
  }

  get contactEmail() {
    return this.contactForm.get('mail');
} 

}
