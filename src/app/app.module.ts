import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { NinetiesComponent } from './components/time-periods/nineties/nineties.component';
import { NinetiesContentComponent } from './components/time-periods/nineties/nineties-content/nineties-content.component';
import { CliComponent } from './components/time-periods/cli/cli.component';
import { PrehistoricComponent } from './components/time-periods/prehistoric/prehistoric.component';
import { ModernComponent } from './components/time-periods/modern/modern.component';
import { FuturisticComponent } from './components/time-periods/futuristic/futuristic.component';
import { ModernContentComponent } from './components/time-periods/modern/modern-content/modern-content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NinetiesComponent,
    NinetiesContentComponent,
    CliComponent,
    PrehistoricComponent,
    ModernComponent,
    FuturisticComponent,
    ModernContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
