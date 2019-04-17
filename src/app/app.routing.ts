import { Routes, RouterModule } from '@angular/router';

/**
 * component
 */
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { movieRoutes, movieRoutingComponent } from './pages/movies/movie.routing';
import { LoginFormComponent } from './elements/login-form/login-form.component';

import { LoginGuard } from './shared/service/login.guard';

export const appRoutes: Routes = [
    { path: '', component: LandingComponent, data: { title: 'Home' } },
    { path: 'movie', children: movieRoutes },
    { path: 'login', component: LoginFormComponent, data: { title: 'Login'}},
    { path: '**', component: NotFoundComponent, data: { title: 'Seite nicht gefunden'} }
];

export const appRouting = RouterModule.forRoot(appRoutes, {
    useHash: true
});

export const routingComponents = [ 
    LandingComponent, 
    NotFoundComponent,
    LoginFormComponent,
    ...movieRoutingComponent
];

