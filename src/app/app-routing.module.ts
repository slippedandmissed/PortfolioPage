import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CliComponent } from './components/time-periods/cli/cli.component';
import { ModernContentComponent } from './components/time-periods/modern/modern-content/modern-content.component';
import { ModernComponent } from './components/time-periods/modern/modern.component';
import { NinetiesContentComponent } from './components/time-periods/nineties/nineties-content/nineties-content.component';
import { NinetiesComponent } from './components/time-periods/nineties/nineties.component';
import { sections } from './data/sections';

const getModernChildren = (): Routes => {
  const routes: Routes = [];

  for (let i = 0; i < sections.length; i++) {
    routes.push({
      path: sections[i].path, component: ModernContentComponent, data: { animation: i }
    });
  }
  routes.push({
    path: "**", redirectTo: sections[0].path
  });

  return routes;
}

const routes: Routes = [
  { path: "cli", component: CliComponent },
  {
    path: "nineties", component: NinetiesComponent, children: [
      { path: "**", component: NinetiesContentComponent }
    ]
  },
  { path: "modern", component: ModernComponent, children: getModernChildren() },
  { path: "**", redirectTo: "/modern" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
