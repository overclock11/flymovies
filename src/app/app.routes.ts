import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {DetailComponent} from "./pages/detail/detail.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail/:title', component: DetailComponent },
  { path: '**', component: HomeComponent }
];
