import { BrowserModule } from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import {NotFoundComponent} from './app.not-found.component';
import { TodolistComponent } from './todolist/todolist.component';
import { ProfileComponent } from './profile/profile.component';
import {MatMenuModule} from '@angular/material/menu';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { userReduce } from './store/reducers/user.reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './services/api.service';
import {todosReduce} from './store/reducers/todo.reducers';
import {TodosEffects} from './store/effects/todo.effect';
import {AppState, metaReducers, reducers} from './store/reducers';
import {UsersEffects} from './store/effects/users.effect';

const appRoutes: Routes = [
  { path: '', component: LoginFormComponent},
  { path: 'main', component: TodolistComponent},
  { path: 'registration', component: RegistrationFormComponent},
  { path: 'main/profile', component: ProfileComponent},
  { path: '**', component: NotFoundComponent}
];

const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('root reducer');


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    NotFoundComponent,
    TodolistComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    // StoreModule.forRoot({}, {}),
    StoreRouterConnectingModule.forRoot(),
    // StoreDevtoolsModule.instrument({ maxAge: 25}),
    EffectsModule.forRoot([]),
    // StoreModule.forRoot(REDUCER_TOKEN, {metaReducers}),
    StoreModule.forRoot(reducers, {metaReducers: []}),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 50 })
      : [],
    EffectsModule.forRoot([TodosEffects, UsersEffects])
  ],
  providers: [ApiService, {
    provide: REDUCER_TOKEN,
    useValue: reducers
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
