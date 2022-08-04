import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { InsightsComponent } from './pages/insights/insights.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { AboutComponent } from './pages/about/about.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SharedModule } from './shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { InsightDetailsComponent } from './pages/insight-details/insight-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCommonModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule} from '@angular/material/input';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AddComponent } from './pages/add/add.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AgmCoreModule } from '@agm/core';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { AgmMarkerClustererModule } from '@agm/markerclusterer';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatDialogModule } from '@angular/material/dialog';
import { OrganisationDetailsComponent } from './pages/organisation-details/organisation-details.component';
import { VoyageEcosystemComponent } from './pages/voyage-ecosystem/voyage-ecosystem.component';
import { MindsetModalComponent } from './pages/voyage-ecosystem/mindset-modal/mindset-modal.component';
import { StartupComponent } from './pages/add/startup/startup.component';
import { StructureComponent } from './pages/add/structure/structure.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthService, } from 'angularx-social-login';
import { SocialLoginModule, SocialAuthServiceConfig } from "angularx-social-login";
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    InsightsComponent,
    JobsComponent,
    AboutComponent,
    PartnersComponent,
    ContactComponent,
    InsightDetailsComponent,
    SigninComponent,
    SignupComponent,
    LoginComponent,
    AddComponent,
    OrganisationDetailsComponent,
    VoyageEcosystemComponent,
    MindsetModalComponent,
    StartupComponent,
    StructureComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    CarouselModule,
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    SocialLoginModule,
    AngularSvgIconModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyChcjkPbOij2BQWAtCiuMqBB2EiDOxiyn4',//'AIzaSyBhe1_S7DJpRm9_WIDSVvRAdizGLd1ywxw',
      libraries: ['places']
    }),
    AgmMarkerClustererModule,
    NgProgressModule.withConfig({
      color: '#E62825'
    }),
    NgProgressHttpModule,
    MatChipsModule,
    NgxSliderModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1005577919778-2kiccrvirltdvupo5fp1tjsrcq1gms1o.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('666932837911560')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
