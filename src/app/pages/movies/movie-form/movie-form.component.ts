import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../../../shared/service/movie.service';


import { MovieClass, createInitialMovie } from '../../../shared/model/movie';
import { AgeClass } from 'src/app/shared/model/age.class';
import { Subscription, throwError } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

const COVERDIR = 'assets/cover/';
const PREFIX = '.jpg'; 

@Component({
  selector: 'fk-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  movie;
  ages = new AgeClass().age;
  subscription: Subscription;
  id;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
  ) { 
    this.movie = createInitialMovie();
  }

  ngOnInit() {
    this.getMovieId();
    
    if (this.id) {
      this.movieService.getWhereMovie('id', this.id).valueChanges().subscribe( res => {
        this.movie = res[0];
        this.movie.cover = this.movie.cover.split('/')[2].split('.')[0];
      });
    }

  }

  requsteTodo(  form: MovieClass ) {

    if (this.id) {
      this.updateMovie(form);
    } else {
      this.addMovie(form);
    }
  }

  addMovie( form: MovieClass ) {
    console.log('add', form)
    form.cover = COVERDIR + form.cover + PREFIX;
    form.id = form.title + Date.now();
    form.subtitle = form.subtitle ? true : false
    form.lowercaseTitle = form.title.toLocaleLowerCase();
    this.movieService.createMovie(form).then(
      res => {
        this.resetFields(),
        this.router.navigate(['/movie/overview'])
      }
    );
  }

  updateMovie( movie ) {
    movie.cover = COVERDIR + movie.cover + PREFIX;
    let movieCollection = this.movieService.getWhereMovie('id', this.id);
    let snapshotId = this.createSnapshotId(movieCollection);
    snapshotId.subscribe( arr => {
      this.movieService.updateMovie( movie, arr)
        .then(
          res => {
            this.resetFields();
            this.router.navigate(['./movie/overview']);
          }
        )
    }); 
  }

  /* 
  *
  * Helper
  * 
  */
 getMovieId() {
  this.subscription = this.route.params.subscribe( 
    params => {
      
      if (params) {
        this.id = params.id
      } else {
        this.id = null;
        return null;
      }

     });
 }

 resetFields() {
   this.movie = createInitialMovie();
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
