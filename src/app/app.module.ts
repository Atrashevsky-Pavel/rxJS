import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Part1Component } from './comp/part1/part1.component';
import { Part2Component } from './comp/part2/part2.component';
import { Part3Component } from './comp/part3/part3.component';
import { Part4Component } from './comp/part4/part4.component';
import { Part5Component } from './comp/part5/part5.component';
import { Part6Component } from './comp/part6/part6.component';
import { Part7Component } from './comp/part7/part7.component';

@NgModule({
  declarations: [
    AppComponent,
    Part1Component,
    Part2Component,
    Part3Component,
    Part4Component,
    Part5Component,
    Part6Component,
    Part7Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
