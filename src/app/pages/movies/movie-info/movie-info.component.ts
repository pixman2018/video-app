import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'fk-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {

  @Input() movie;
  @Output() getInfo = new EventEmitter();


  constructor(
  ) { 
  }

  ngOnInit() {
    console.log(this.movie)
  }

  closeInfo() {
    this.getInfo.emit();
  }

}
