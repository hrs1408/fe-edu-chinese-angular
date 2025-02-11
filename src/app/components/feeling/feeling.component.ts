import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FeelingService } from './feeling.service';
Swiper.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-feeling',
  templateUrl: './feeling.component.html',
  styleUrls: ['./feeling.component.scss']
})
export class FeelingComponent implements OnInit {
  students: any[] = [];

  constructor(
    private feelingService: FeelingService,
  ) { }

  ngOnInit(): void {
    this.feelingService.getReviews().subscribe((reviews: any) => {
      this.students = reviews.data;
      console.log(this.students);
    });
  }
}
