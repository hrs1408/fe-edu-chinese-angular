import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/slider/slider.component';
import { InfoSectionComponent } from './components/info-section/info-section.component';
import { TeacherSliderComponent } from './components/teacher-slider/teacher-slider.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { FeatureComponent } from './components/feature/feature.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivitiComponent } from './components/activiti/activiti.component';
import { register } from 'swiper/element/bundle';
import { FeelingComponent } from './components/feeling/feeling.component';
import { HttpClientModule } from '@angular/common/http';
import { PostListComponent } from './pages/post-list/post-list.component';
import { StripHtmlPipe } from './pipes/strip-html.pipe';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CoursesComponent } from './pages/courses/courses.component';
import { RegisterComponent } from './pages/register/register.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { DocumentListComponent } from './pages/document-list/document-list.component';
import { StudyAbroadListComponent } from './pages/study-abroad-list/study-abroad-list.component';
import { StudyAbroadDetailComponent } from './pages/study-abroad-detail/study-abroad-detail.component';
import { DocumentDetailComponent } from './pages/document-detail/document-detail.component';
import { ContactButtonsComponent } from './components/contact-buttons/contact-buttons.component';
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';

register();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    InfoSectionComponent,
    TeacherSliderComponent,
    StatisticsComponent,
    FeatureComponent,
    ActivitiComponent,
    FeelingComponent,
    PostListComponent,
    StripHtmlPipe,
    PostDetailComponent,
    CoursesComponent,
    RegisterComponent,
    CourseDetailComponent,
    DocumentListComponent,
    StudyAbroadListComponent,
    StudyAbroadDetailComponent,
    DocumentDetailComponent,
    ContactButtonsComponent,
    ScrollRevealDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
