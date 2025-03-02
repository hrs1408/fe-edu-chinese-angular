import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { RegisterComponent } from './pages/register/register.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { DocumentListComponent } from './pages/document-list/document-list.component';
import { DocumentDetailComponent } from './pages/document-detail/document-detail.component';
import { StudyAbroadListComponent } from './pages/study-abroad-list/study-abroad-list.component';
import { StudyAbroadDetailComponent } from './pages/study-abroad-detail/study-abroad-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Default route
  { path: 'gioi-thieu', component: AboutComponent },
  { path: 'tin-tuc', component: PostListComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'khoa-hoc', component: CoursesComponent },
  { path: 'khoa-hoc-by-type/:id', component: CoursesComponent },
  { path: 'khoa-hoc-chi-tiet/:id', component: CourseDetailComponent },
  { path: 'dang-ky/:courseId', component: RegisterComponent },
  { path: 'tai-lieu', component: DocumentListComponent },
  { path: 'tai-lieu/:id', component: DocumentDetailComponent },
  { path: 'du-hoc-trung-quoc', component: StudyAbroadListComponent },
  { path: 'du-hoc-trung-quoc/:id', component: StudyAbroadDetailComponent },
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
