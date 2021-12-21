import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'posts', component: ListComponent },
  { path: 'post/:id', component: DetailsComponent },
  // { path: '404', component: PageNotFoundComponent },
  // { path: '**', pathMatch: 'full' , redirectTo: '404' }
  { path: '**', pathMatch: 'full' , redirectTo: 'posts' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }