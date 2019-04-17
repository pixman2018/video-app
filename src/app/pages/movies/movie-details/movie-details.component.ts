import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from './../../../shared/service/movie.service';
import { MovieInterface, createInitialMovie } from 'src/app/shared/model/movie';

@Component({
  selector: 'fk-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie = createInitialMovie();

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe( res => {
      const id = decodeURI(res.id);
      this.movieService.getMovieById(id).valueChanges().subscribe( (res) => {
        this.movie = res[0];
        console.log(this.movie)
      });
    });
    
  }

}
