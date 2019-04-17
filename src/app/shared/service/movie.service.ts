import { Injectable } from '@angular/core';
import { MovieInterface } from './../model/movie';

import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


const BASEURL = 'http://localhost:3000/api/movies/';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movieCollection: AngularFirestoreCollection<MovieInterface>;

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private firestore: AngularFirestore,
  ) {
    this.movieCollection = this.firestore.collection('/movies');
  }
  
  getAllMovies() {
    return this.movieCollection.valueChanges();
  }

  getWhereMovie( params, searchParams) {
    return this.firestore.collection('movies', ref => {
      return ref.where(params, '==', searchParams);
    });
  }

  getMovieById( id ) {
    return this.firestore.collection('movies', ref => {
      return ref.where('id', '==', id);
    });
  }

  searchMovie( start, end) {
     
  }

  createMovie( movie ) {
    return this.movieCollection.add({
      id: movie.id,
      title: movie.title,
      lowercaseTitle:  movie.title.toLocaleLowerCase(),
      subline: movie.subline,
      cover: movie.cover,
      age: movie.age,
      description: movie.description,
      length: movie.length,
      subtitle: movie.subtitle,
      year: movie.year,
      createDate: new Date()
    });
  }

  updateMovie( movie, key) {
    return this.movieCollection.doc(key).set(movie);
  }

  deleteMovie( key ) {
    // TODO: Error wird zweimal gestartet
    return this.movieCollection.doc(key).delete();
  }

  
 
}

