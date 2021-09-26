import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NinetiesContentComponent } from './components/time-periods/nineties/nineties-content/nineties-content.component';
import { NinetiesComponent } from './components/time-periods/nineties/nineties.component';

const routes: Routes = [
  { path: "nineties", component: NinetiesComponent, children: [
    { path: "**", component: NinetiesContentComponent }
  ] },
  { path: "**", redirectTo: "/nineties" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
