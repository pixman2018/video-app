import { Component, OnInit, ViewEncapsulation, ContentChild, TemplateRef, AfterViewInit, AfterContentInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';


import { MovieService } from '../../../shared/service/movie.service';




@Component({
  selector: 'fk-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MovieListComponent implements OnInit, AfterContentInit {

  @Input() movies: any;
  @ContentChild(TemplateRef) previewTemplate: TemplateRef<any>; 

  hasCustomTemplate: boolean;



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

  // get position from all movies
  // let allMovies = document.querySelectorAll('.card');
  // console.log(allMovies.length)
  // allMovies.forEach( (movie) => {
  //   console.log( this.getCoords(movie) )
  // });

  }


  ngAfterContentInit() {
    this.hasCustomTemplate = this.previewTemplate != null;
  }
/* 
* return the position from a element
*/
  getCoords(elem) {
    let box = elem.getBoundingClientRect();
  
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

}




