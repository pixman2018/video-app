import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 

import { MovieService } from './../../../shared/service/movie.service';
import { MovieInterface, createInitialMovie } from 'src/app/shared/model/movie';

@Component({
  selector: 'fk-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location,
  ) { 
    this.movie = 'assets/img/nopic.png';
  }

  ngOnInit() {
    this.route.params.subscribe( res => {
      const id = decodeURI(res.id);
      this.movieService.getMovieById(id).valueChanges().subscribe( (res) => {
        this.movie = res[0];
        // TODO: Error ermitteln
      });
    });
  }

  backToMovie() {
    this.location.back();
  }

}
