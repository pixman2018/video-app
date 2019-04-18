import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/service/movie.service';

import { MovieInterface, createInitialMovie } from 'src/app/shared/model/movie';
@Component({
  selector: 'fk-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  movies;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.movieService.getAllMovies().subscribe( res => {
      this.movies = res;
    });
  }

}
