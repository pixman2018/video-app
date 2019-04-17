import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import {filter} from 'rxjs/internal/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from 'angularfire2/database';


import { MovieService } from '../../../shared/service/movie.service';
import { MovieInterface,  } from '../../../shared/model/movie';




@Component({
  selector: 'fk-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MovieListComponent implements OnInit {

  movies; //: Observable<MovieInterface[]>;


  constructor(
    private movieService: MovieService,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
  ) { }



  ngOnInit() {

    
    // read query Paramter
    this.route.queryParams.subscribe( (params) => {
      if  (params.search === undefined) {
        this.movieService.getAllMovies().subscribe( res => {
          this.movies = res;
        });
      } else {
        const query = decodeURI(params.search.toLowerCase() || '');
        this.firestore.collection('movies', ref => //'\uf8ff'
          ref.orderBy('lowercaseTitle').startAt(query).endAt(query + '\uf8ff')).valueChanges()
          .subscribe( res => {
            this.movies = res;
            if (res.length === 0) {
              this.movieService.getAllMovies().subscribe( res => {
                this.movies = res;
              });
            }
          });
      }//if
    });// route

  //
  let allMovies = document.querySelectorAll('.card');
  console.log(allMovies.length)
  allMovies.forEach( (movie) => {
    console.log( this.getCoords(movie) )
  });


  }

  getCoords(elem) {
    let box = elem.getBoundingClientRect();
    console.log(box)
  
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

}




