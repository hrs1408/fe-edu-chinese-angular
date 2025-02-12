import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Loại bỏ tất cả các thẻ HTML
    const strippedString = value.replace(/(<([^>]+)>)/gi, '');

    // Decode các ký tự đặc biệt HTML
    const div = document.createElement('div');
    div.innerHTML = strippedString;
    return div.textContent || div.innerText || '';
  }
}
