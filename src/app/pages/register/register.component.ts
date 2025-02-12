import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CourseService } from '../../services/course.service';
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
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    note: ['']
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private courseService: CourseService,
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
      const formData = {
        ...this.registerForm.value,
        courseId: this.courseId
      };

      // TODO: Implement API call to submit registration
      console.log('Form submitted:', formData);

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        // TODO: Handle success/error response
        alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
        this.router.navigate(['/khoa-hoc']);
      }, 1500);
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
