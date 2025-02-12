import { Component, OnInit } from '@angular/core';

interface StatItem {
  value: number;
  currentValue: number;
  unit: string;
  description: string;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  stats: StatItem[] = [
    { value: 74, currentValue: 0, unit: 'cấp độ', description: 'Các cấp độ đào tạo' },
    { value: 29, currentValue: 0, unit: 'trường', description: 'Tổng số trường hợp tác' },
    { value: 37, currentValue: 0, unit: 'giải thưởng', description: 'Thành tựu đạt được' },
    { value: 2192, currentValue: 0, unit: 'người', description: 'Tổng số giáo viên' },
    { value: 5748, currentValue: 0, unit: 'người', description: 'Tổng số học viên' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.startCountAnimation();
  }

  startCountAnimation() {
    const duration = 4000; // 4 seconds
    const steps = 60;
    const interval = duration / steps;

    const animate = () => {
      let allComplete = true;

      this.stats.forEach(stat => {
        if (stat.currentValue < stat.value) {
          allComplete = false;
          const increment = Math.ceil(stat.value / steps);
          stat.currentValue = Math.min(stat.currentValue + increment, stat.value);
        }
      });

      if (!allComplete) {
        setTimeout(animate, interval);
      }
    };

    animate();
  }

  scrollToInfoSection() {
    const infoSection = document.getElementById('info-section');
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
