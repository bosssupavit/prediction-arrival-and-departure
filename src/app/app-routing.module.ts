import { StaticComponent } from './static/static.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditComponent } from './credit/credit.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'static', component: StaticComponent},
  { path: 'credit', component: CreditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
