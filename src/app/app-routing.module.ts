import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Default route
  { path: 'gioi-thieu', component: AboutComponent },
  { path: 'tin-tuc', component: PostListComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '**', redirectTo: '' } // Wildcard route cho 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64] // Offset cho header
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
