import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnnounceDriver } from '../announce-driver/announceDriver.model';

@Injectable({
  providedIn: 'root',
})
export class AnnounceDriverService {
  apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getAnnounces(): Observable<AnnounceDriver[]> {
    return this.http.get<AnnounceDriver[]>(`${this.apiUrl}/announcesDrivers`);
  }

  addAnnounce(announceDriver: AnnounceDriver): Observable<AnnounceDriver> {
    return this.http.post<AnnounceDriver>(
      `${this.apiUrl}/announcesDrivers`,
      announceDriver
    );
  }
}
