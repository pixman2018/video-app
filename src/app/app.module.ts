import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routingComponents, appRouting} from './app.routing';
/**
 * firebase
 */
// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

/**
 * Module
 */
import { MovieModule } from './pages/movies/movie.module';

/**
 * component
 */
import { AppComponent } from './app.component';
import { MainNavigationComponent } from './elements/main-navigation/main-navigation.component';
import { SearchFormComponent } from './elements/search-form/search-form.component';
import { AlertComponent } from './elements/alert/alert.component';

/*
* Directiven
*/
import { APPLICATION_VALIDATORS } from './shared/model/app-validators';

/**
 * Service
 */
// import { MessageService } from './shared/service/message.service';
import { UserService } from './shared/service/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShowErrorComponent } from './shared/show-error/show-error.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MainNavigationComponent,
    SearchFormComponent,
    AlertComponent,
    ShowErrorComponent,
    APPLICATION_VALIDATORS,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MovieModule,
    appRouting,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(
      environment.firebaseConfig
    ),
  ],
  entryComponents: [
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-de' },
    // MessageService,
    UserService,
    AngularFirestore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
