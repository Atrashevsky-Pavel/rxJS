import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../store';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from '../store/effects/weather.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {YearPipe} from './pipes/year.pipe';
import {TempPipe} from './pipes/temp.pipe';
import {WindPipe} from './pipes/wind.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {ModalComponent} from './components/modal/modal.component';
import {CardComponent} from './components/card/card.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalComponent,
    CardComponent,
    YearPipe,
    TempPipe,
    WindPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([WeatherEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
