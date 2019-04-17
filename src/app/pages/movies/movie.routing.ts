import { MoviesComponent } from './movies/movies.component';
import { MovieOverviewComponent } from './movie-overview/movie-overview.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

import { LoginGuard } from './../../shared/service/login.guard';


export const movieRoutes = [
    { path: '', component: MoviesComponent, 
    children: [
        { path: '', component: MovieListComponent, data: { title: 'Filme'} },
        { path: 'overview', component: MovieOverviewComponent, canActivate: [LoginGuard], data: { title: 'Filme-Übersicht'}},
        // TODO: alternative optionale routings?
        { path: 'overview/:id', component: MovieOverviewComponent, canActivate: [LoginGuard], data: { title: 'Filme-Übersicht'}}, 
        { path: 'edit/:id', component: MovieFormComponent, canActivate: [LoginGuard] },
        { path: 'new', component: MovieFormComponent, canActivate: [LoginGuard], data: { title: 'Film neu anlegen'} },
        { path: 'details/:id', component: MovieDetailsComponent, data: { title: 'Filmdetails'} } // TODO: Titel mit den Namen des Filmes
       
    ]}
];

export const movieRoutingComponent = [
    MoviesComponent,
    MovieOverviewComponent,
    MovieFormComponent,
    MovieListComponent,
    MovieDetailsComponent,
];