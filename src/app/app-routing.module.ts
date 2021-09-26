import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CliComponent } from './components/time-periods/cli/cli.component';
import { FuturisticComponent } from './components/time-periods/futuristic/futuristic.component';
import { ModernComponent } from './components/time-periods/modern/modern.component';
import { NinetiesContentComponent } from './components/time-periods/nineties/nineties-content/nineties-content.component';
import { NinetiesComponent } from './components/time-periods/nineties/nineties.component';
import { PrehistoricComponent } from './components/time-periods/prehistoric/prehistoric.component';

const routes: Routes = [
  { path: "prehistoric", component: PrehistoricComponent },
  { path: "cli", component: CliComponent },
  { path: "nineties", component: NinetiesComponent, children: [
    { path: "**", component: NinetiesContentComponent }
  ] },
  { path: "", component: ModernComponent },
  { path: "futuristic", component: FuturisticComponent },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
