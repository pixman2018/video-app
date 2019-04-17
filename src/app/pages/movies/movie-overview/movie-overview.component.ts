import { Component, OnInit, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map  } from 'rxjs/internal/operators';

/**
 * Service
 */
import { MovieService } from '../../../shared/service/movie.service';

/**
 * Interface and class
 */
  import { MovieInterface,  } from '../../../shared/model/movie';


@Component({
  selector: 'fk-movie-overview',
  templateUrl: './movie-overview.component.html',
  styleUrls: ['./movie-overview.component.scss'],
})
export class MovieOverviewComponent implements OnInit {

  movies$: Observable<MovieInterface[]>;
  movie: Observable<MovieInterface>
  subscription: Subscription;
  id;
  showInfo: boolean = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,

  ) { 
  }

  ngOnInit() {
    this.movies$ = this.movieService.getAllMovies();
    this.getMovieId();

    // search
    // https://github.com/angular/angularfire2/issues/1353

  }

  updateMovie(movie: MovieInterface) {
    this.router.navigate(['movie/edit', movie.id]);
  }

  deleteMovie(movie) {
 
    let movieCollection = this.movieService.getWhereMovie('id', movie.id);
    let snapshotId = this.createSnapshotId(movieCollection);

    snapshotId.subscribe( (arr) => {
      const id = arr;
      if (id) {
        this.movieService.deleteMovie(id)
        .then(
          res => {
            this.router.navigate(['./movie/overview']);
          }
        )
      }
    }); 

  }

  getShowInfo( movie ) {
    this.showInfo = true;
    this.movie = movie;

  }

  closeInfo( event ) {
    this.showInfo = false;
  }

  /*
  *
  * Helper
  * 
  * */
 getMovieId() {
  this.subscription = this.route.params.subscribe(
    params => {
     this.id = params['0'] ? params['0'] : null;
    }
  )
 }

 createSnapshotId(movieCollection) {
  return movieCollection.snapshotChanges()
    .pipe(
      map( arr => {
        return arr[0].payload.doc.id;
      })
      
    );
  }
    
}
