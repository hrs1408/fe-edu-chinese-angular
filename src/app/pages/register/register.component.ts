import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CourseService } from '../../services/course.service';
import { ToastService } from '../../services/toast.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  courseId!: number;
  course: any;
  isLoading = false;
  error: string | null = null;
  isSubmitting = false;

  registerForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required]],
    birthYear: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    zalo: [''],
    email: ['', [Validators.required, Validators.email]],
    interestedCourse: ['', [Validators.required]],
    studyForm: ['', [Validators.required]]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private courseService: CourseService,
    private toastService: ToastService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    if (courseId) {
      this.courseId = +courseId;
      this.loadCourseInfo();
    } else {
      this.error = 'Không tìm thấy thông tin khóa học';
    }
  }

  loadCourseInfo(): void {
    this.isLoading = true;
    this.error = null;

    this.courseService.getCourseById(this.courseId).subscribe({
      next: (response) => {
        this.course = response.data;
        this.registerForm.patchValue({
          interestedCourse: this.course.course_name
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading course:', error);
        this.error = 'Có lỗi xảy ra khi tải thông tin khóa học. Vui lòng thử lại sau.';
        this.isLoading = false;
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  onSubmit(): void {
    if (this.registerForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formData = new FormData();

      // Map form fields to Google Form fields
      formData.append('entry.1916054590', this.registerForm.value.fullName);
      formData.append('entry.122846010', this.registerForm.value.birthYear);
      formData.append('entry.1875805140', this.registerForm.value.phone);
      formData.append('entry.1342236707', this.registerForm.value.zalo || '');
      formData.append('entry.1689425395', this.registerForm.value.email);
      formData.append('entry.841802827', this.course.course_name);
      formData.append('entry.1596932414', this.registerForm.value.studyForm);

      // Gửi form đến Google Forms
      this.http
        .post(
          'https://docs.google.com/forms/d/e/1FAIpQLSdpnQQFsX2D9HQcVVuFjlQnmilykFvMV-lv9j9dE9DsM1J9Tw/formResponse',
          formData
        )
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            this.toastService.success('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.', 'Thành công');
            this.router.navigate(['/khoa-hoc']);
          },
          error: () => {
            // Google Form luôn trả về lỗi CORS nhưng vẫn submit thành công
            this.isSubmitting = false;
            this.toastService.success('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.', 'Thành công');
            this.router.navigate(['/khoa-hoc']);
          }
        });
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      this.toastService.error('Vui lòng điền đầy đủ thông tin bắt buộc');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
