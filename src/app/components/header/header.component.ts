import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menus = [
    {
      title: 'Accueil',
      icon: 'home',
      path: 'home'
    },
    {
      title: 'Map',
      icon: 'map',
      path: 'map'
    },
    {
      title: 'Insights',
      icon: 'insights',
      path: 'insights'
    },
    {
      title: 'Jobs',
      icon: 'jobs',
      path: 'jobs'
    },
   /* {
      title: 'Voyage dans l’écosystème',
      icon: 'voyage',
      path: 'voyage-ecosystem'
    },*/
    {
      title: 'À propos',
      icon: 'about',
      path: 'about'
    },
    {
      title: 'Partenaires',
      icon: 'partners',
      path: 'partners'
    },
    {
      title: 'Contact',
      icon: 'contact',
      path: 'contact'
    }
  ];
  menusmap = [
    {
      title: 'Accueil',
      icon: 'home',
      path: 'home'
    },
    {
      title: 'Map',
      icon: 'map',
      path: 'map'
    },
    {
      title: 'Insights',
      icon: 'insights',
      path: 'insights'
    },
    {
      title: 'Voyage dans l’écosystème',
      icon: 'voyage',
      path: 'voyage-ecosystem'
    },
  ];

  constructor(private credentialsService: CredentialsService,
    public  router: Router) { }

  ngOnInit(): void {
  }

  get isLoggedIn(): boolean {
    return this.credentialsService.isAuthenticated();
  }

  logout(): void {
    this.credentialsService.logout();
    this.router.navigate(['/login']);
  }

}
