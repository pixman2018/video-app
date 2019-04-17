import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component
 */
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';

/**
 * Service
 */
import { MovieService } from '../../shared/service/movie.service';


@NgModule({
  declarations: [
    MovieItemComponent,
    MovieInfoComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    MovieInfoComponent,
    MovieItemComponent
  ],
  entryComponents: [
    //MovieInfoComponent
  ],
  providers: [
    MovieService
  ],
})
export class MovieModule { }
