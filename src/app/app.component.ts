import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd, } from '@angular/router';
import { Title } from '@angular/platform-browser';

import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'fk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'video-app';
  defaultTitle: string;
  showSearchBar: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit() {
    // create dynamic title
    this.defaultTitle = this.titleService.getTitle();
    this.router.events.pipe(
      filter( event => event instanceof NavigationEnd))
      .subscribe( event => {
        this.setBrowserTitle();
    });

    // is the current component 'movie overview'
    this.router.events.pipe(
      filter(ev => (ev instanceof NavigationEnd))
    ).subscribe((ev: NavigationEnd) => {
      if(ev.url == '/movie/overview') {
        this.showSearchBar = false;
      } else {
        this.showSearchBar = true;
      }
    });
  }

  setBrowserTitle() {
    let title = this.defaultTitle;
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
      title = route.snapshot.data['title'] || title;
    }
    this.titleService.setTitle(title);
  }
}
