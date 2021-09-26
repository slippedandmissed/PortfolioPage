import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { NinetiesComponent } from './components/time-periods/nineties/nineties.component';
import { NinetiesContentComponent } from './components/time-periods/nineties/nineties-content/nineties-content.component';

@NgModule({
  declarations: [
    AppComponent,
    NinetiesComponent,
    NinetiesContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
