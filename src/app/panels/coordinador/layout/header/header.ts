import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { UserService, User } from '../../../../core/services/user.service';
import { NotificationsService, Notification } from '../../../../core/services/notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
}) 
export class HeaderComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private notificationsService = inject(NotificationsService);

  user: User = { id: 0, name: 'Usuario', email: '', role: '' };
  notifications: Notification[] = [];

  private subscriptions: Subscription[] = [];

  ngOnInit() {
    const userSub = this.userService.getCurrentUser().subscribe({
      next: (data: User) => this.user = data,
      error: (err: any) => console.error('Error al obtener usuario:', err)
    });
    this.subscriptions.push(userSub);

    const notifSub = this.notificationsService.getNotifications().subscribe({
      next: (data: Notification[]) => this.notifications = data,
      error: (err: any) => console.error('Error al obtener notificaciones:', err)
    });
    this.subscriptions.push(notifSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
