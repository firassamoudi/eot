import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/http/api.service';
import { CredentialsService } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from '../../core/services/title.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  err: string;
  success: string;

  loginForm: FormGroup = this.fb.group({
    identifier: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private credentialService: CredentialsService,
              private router: Router,
              private route: ActivatedRoute,
              private titleService: TitleService,
              private authService: SocialAuthService
              ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Se Connecter');
    if (this.route.snapshot.queryParams.signup === 'success') {
      this.success = 'Votre compte a été créé avec succès';
    }
  }

  login(): void {
    console.log(this.loginForm.value);
    this.api.login(this.loginForm.value).then(value => {
      this.credentialService.setCredentials(value);
      if (this.route.snapshot.queryParams.redirect) {
        this.router.navigateByUrl(this.route.snapshot.queryParams.redirect);
      } else {
        this.router.navigate(['/home']);
      }
    }).catch(() => {
      this.err = 'Identifiant ou mot de passe invalide';
    });
  }

  loginGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then((googleUser) => {
      this.api.loginGoogle(googleUser.authToken).then(value => {
        this.credentialService.setCredentials(value.jwt);
        if (this.route.snapshot.queryParams.redirect) {
          this.router.navigateByUrl(this.route.snapshot.queryParams.redirect);
        } else {
          this.router.navigate(['/home']);
        }
      }).catch(() => {
        this.err = 'Aucun compte avec cette adresse existe';
      });
    }).catch((e) => {
      console.log("error oauth ", e);
      
    });
  }

  loginFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then((facebookUser) => {
      this.api.loginGoogle(facebookUser.authToken).then(value => {
        this.credentialService.setCredentials(value.jwt);
        if (this.route.snapshot.queryParams.redirect) {
          this.router.navigateByUrl(this.route.snapshot.queryParams.redirect);
        } else {
          this.router.navigate(['/home']);
        }
      }).catch(() => {
        this.err = 'Aucun compte avec cette adresse existe';
      });
    }).catch((e) => {
      console.log("error oauth ", e);
      
    });
  }

}
