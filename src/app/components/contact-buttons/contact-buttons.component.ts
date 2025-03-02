import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-contact-buttons',
  templateUrl: './contact-buttons.component.html',
  styleUrls: ['./contact-buttons.component.scss']
})
export class ContactButtonsComponent implements AfterViewInit {
  @ViewChild('messengerBtn') messengerBtn!: ElementRef;
  @ViewChild('zaloBtn') zaloBtn!: ElementRef;
  @ViewChild('phoneBtn') phoneBtn!: ElementRef;

  contactLinks = {
    messenger: 'https://m.me/61569702407315',
    zalo: 'https://zalo.me/0789830123',
    phone: 'tel:+84789830123'
  };

  tooltips = {
    messenger: 'Nhắn tin qua Messenger',
    zalo: 'Liên hệ qua Zalo',
    phone: 'Gọi điện trực tiếp'
  };

  constructor(private animationService: AnimationService) {}

  ngAfterViewInit() {
    // Add entrance animations with delays
    this.animationService.animate(this.messengerBtn, 'bounceIn', 'none');
    this.animationService.animate(this.zaloBtn, 'bounceIn', 'short');
    this.animationService.animate(this.phoneBtn, 'bounceIn', 'medium');

    // Add hover animations
    this.setupHoverAnimation(this.messengerBtn);
    this.setupHoverAnimation(this.zaloBtn);
    this.setupHoverAnimation(this.phoneBtn);
  }

  private setupHoverAnimation(element: ElementRef) {
    const el = element.nativeElement;
    el.addEventListener('mouseenter', () => {
      this.animationService.animate(element, 'pulse');
    });
  }
}
