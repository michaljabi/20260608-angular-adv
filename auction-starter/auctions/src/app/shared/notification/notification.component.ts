import { Component, input, output } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

@Component({
  selector: 'app-notification',
  standalone: false,
  template: `
    <div class="notification" [class]="type()">
      <span class="message">{{ message() }}</span>
      @if (dismissible()) {
        <button class="dismiss" (click)="dismiss.emit()" aria-label="Close">&times;</button>
      }
    </div>
  `,
  styles: `
    .notification {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border-radius: 4px;
      font-size: 14px;
    }
    .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
    .error   { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    .info    { background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; }
    .warning { background: #fff3cd; color: #856404; border: 1px solid #ffeeba; }
    .message { flex: 1; }
    .dismiss {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      padding: 0 4px;
      line-height: 1;
    }
  `
})
export class NotificationComponent {
  message = input.required<string>();
  type = input<NotificationType>('info');
  dismissible = input(true);
  dismiss = output<void>();
}
