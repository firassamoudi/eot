import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { CredentialsService } from 'src/app/core';
import { ApiService } from 'src/app/core/http/api.service';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  err: string;
  success: string;

  resetForm: FormGroup = this.fb.group({
    code: ['', [Validators.required]],
    password: ['', [Validators.required]],
    passwordConfirmation: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private credentialService: CredentialsService,
              private router: Router,
              private route: ActivatedRoute,
              private titleService: TitleService,
              ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Reset password');
    if (this.route.snapshot.queryParams.signup === 'success') {
      this.success = 'Votre mot de passe a été réinitializé avec succès';
    }
  }

  resetPassword(): void {
    this.api.resetPassword(this.resetForm.value).then(value => {
      this.router.navigate(['/home']);
    }).catch(() => {
      this.err = 'Votre mot de passe ou code invalide';
    });
  }

}
