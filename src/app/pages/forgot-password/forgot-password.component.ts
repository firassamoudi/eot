import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CredentialsService } from 'src/app/core';
import { ApiService } from 'src/app/core/http/api.service';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  err: string;
  success: string;

  forgotPwdForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private router: Router,
              private route: ActivatedRoute,
              private titleService: TitleService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Mot de passe oublié');
    if (this.route.snapshot.queryParams.signup === 'success') {
      this.success = 'Veuillez vérifier votre boite mail.';
    }
  }

  forgotPwd(): void {
    this.api.forgotPassword(this.forgotPwdForm.value).then(value => {
      this.router.navigate(['/home']);
    }).catch(() => {
      this.err = 'Votre adresse email est invalide';
    });
  }

}
