import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
