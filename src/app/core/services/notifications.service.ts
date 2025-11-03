import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private baseUrl = 'http://localhost:8000'; // Cambia a tu URL de FastAPI

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/notifications`);
  }
}
