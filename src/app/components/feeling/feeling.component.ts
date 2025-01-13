import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

Swiper.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-feeling',
  templateUrl: './feeling.component.html',
  styleUrls: ['./feeling.component.scss']
})
export class FeelingComponent implements OnInit {
  students = Array(10).fill({
    image: 'https://fangfang.edu.vn/wp-content/uploads/2024/03/1-Nguyen-Hue.jpg',
    name: 'Bạn Nguyễn Huệ',
    title: 'Học viên khóa HSK',
    text: 'Tôi đã có một thời gian học tập tuyệt vời tại trung tâm. Phương pháp giảng dạy rất hiệu quả.'
  });

  constructor() { }

  ngOnInit(): void {
  }
}
