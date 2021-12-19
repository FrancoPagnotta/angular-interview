import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  { path: 'posts', component: ListComponent },
  { path: '**', pathMatch: 'full' , redirectTo: 'posts' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }