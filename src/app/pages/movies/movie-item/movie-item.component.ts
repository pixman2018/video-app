import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MovieDetailsComponent } from './../movie-details/movie-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'fk-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {

  @Input() movie;

  level: number = 0;
  

  constructor(
    private elemRef: ElementRef,
    private router: Router,
  ) { 
  }

  ngOnInit() {
  }



  openDetails(movie) {
    // output the component position
    // console.log(this.elemRef.nativeElement.offsetTop);

    this.router.navigate(['movie', 'details', encodeURI(movie.id) ])
  }

  // getCoords(elem) {
  //   let box = elem.getBoundingClientRect();
  //   console.log(box)
  
  //   return {
  //     top: box.top + pageYOffset,
  //     left: box.left + pageXOffset
  //   };
  // }
}
