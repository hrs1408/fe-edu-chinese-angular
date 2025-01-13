import { Component, OnInit, OnDestroy } from '@angular/core';

interface Teacher {
  id: number;
  name: string;
  image: string;
  description?: string;
}

@Component({
  selector: 'app-teacher-slider',
  templateUrl: './teacher-slider.component.html',
  styleUrls: ['./teacher-slider.component.scss']
})
export class TeacherSliderComponent implements OnInit, OnDestroy {
  teachers: Teacher[] = [
    {
      id: 1,
      name: 'Nguyễn Kính Thanh',
      image: 'https://www.gdufs.edu.cn/__local/A/B6/5B/C6975FD87106CD2AF42774EEB94_60C4D60B_1145D.jpg',
      description: '[Hồ sơ nhân vật] **Nguyễn Kính Thanh** (1905-1994), nhà tâm lý học hiện đại Trung Quốc. Năm 1927, học tại Khoa Giáo dục Đại học Trung Sơn. Năm 1934 sang Nhật du học, nghiên cứu tâm lý giáo dục tại Viện nghiên cứu Đại học Đế quốc Tokyo. Năm 1937 về nước, đảm nhiệm chức vụ giáo sư tại nhiều trường đại học danh tiếng. Ông là một trong những người tiên phong trong lĩnh vực tâm lý học giáo dục tại Trung Quốc.'
    },
    {
      id: 2,
      name: 'Quế Thi Xuân',
      image: 'https://www.gdufs.edu.cn/__local/A/B6/5B/C6975FD87106CD2AF42774EEB94_60C4D60B_1145D.jpg',
      description: '[Hồ sơ nhân vật] **Quế Thi Xuân** (1930-2017), từng là Hiệu trưởng Học viện Ngoại ngữ Quảng Châu, thành viên thứ 3, 4 của Hội đồng Đánh giá Ngành Ngoại ngữ và Văn học Nước ngoài thuộc Hội đồng Học vị Quốc gia. Ông đã có những đóng góp to lớn trong việc phát triển giáo dục ngoại ngữ tại Trung Quốc, đặc biệt là trong lĩnh vực nghiên cứu và giảng dạy tiếng Anh.'
    },
    {
      id: 3,
      name: 'Lý Tiểu Cúc',
      image: 'https://www.gdufs.edu.cn/__local/A/B6/5B/C6975FD87106CD2AF42774EEB94_60C4D60B_1145D.jpg',
      description: '[Hồ sơ nhân vật] **Lý Tiểu Cúc** (1929-2018), nữ, dân tộc Hán, người Thương Ngô, Quảng Tây, giáo sư hướng dẫn tiến sĩ chuyên ngành Ngôn ngữ học và Ngôn ngữ học ứng dụng. Bắt đầu giảng dạy từ năm 1953. Chuyển công tác vào năm 1970. Bà là một trong những chuyên gia hàng đầu trong lĩnh vực ngôn ngữ học ứng dụng, đã đào tạo nhiều thế hệ sinh viên và nghiên cứu sinh, đóng góp quan trọng trong việc phát triển ngành ngôn ngữ học tại Trung Quốc.'
    },
    {
      id: 4,
      name: 'Hoàng Kiến Hoa',
      image: 'https://www.gdufs.edu.cn/__local/A/B6/5B/C6975FD87106CD2AF42774EEB94_60C4D60B_1145D.jpg',
      description: '[Hồ sơ nhân vật] **Hoàng Kiến Hoa**, sinh năm 1936. Nguyên Hiệu trưởng Đại học Ngoại ngữ và Ngoại thương Quảng Đông, giáo sư hướng dẫn tiến sĩ, giáo sư cấp 2. Ông từng giữ chức vụ Chủ tịch Hiệp hội Dịch thuật Quảng Châu, Phó Chủ tịch Hiệp hội Từ điển Trung Quốc kiêm Chủ tịch Ủy ban Chuyên môn Từ điển Song ngữ Toàn quốc. Dưới sự lãnh đạo của ông, trường đại học đã có những bước phát triển vượt bậc trong lĩnh vực giáo dục ngoại ngữ và thương mại quốc tế.'
    },
    {
      id: 5,
      name: 'Diêu Niệm Khánh',
      image: 'https://www.gdufs.edu.cn/__local/A/B6/5B/C6975FD87106CD2AF42774EEB94_60C4D60B_1145D.jpg',
      description: '[Hồ sơ nhân vật] **Diêu Niệm Khánh** (1917-1988), người Lạc Điền, tỉnh Hồ Bắc. Sau khi tốt nghiệp nghiên cứu sinh năm 1942, từng làm thư ký cho Tiền Xương Chiếu (nguyên Phó Chủ tịch Chính hiệp Toàn quốc). Năm 1948 sang Anh du học, sau khi hoàn thành khóa học đã quyết định trở về nước phục vụ. Ông đã có những đóng góp quan trọng trong việc phát triển quan hệ giáo dục quốc tế và đào tạo nhân tài trong lĩnh vực ngoại ngữ.'
    }
  ];

  currentIndex = 2;
  title = 'NHÂN VẬT';
  showTooltip = false;
  private autoSlideInterval: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  onDescriptionHover(isHovering: boolean) {
    this.showTooltip = isHovering;
    if (isHovering) {
      this.stopAutoSlide();
    } else {
      this.startAutoSlide();
    }
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.teachers.length) % this.teachers.length;
    this.showTooltip = false;
    this.resetAutoSlide();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.teachers.length;
    this.showTooltip = false;
    this.resetAutoSlide();
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
