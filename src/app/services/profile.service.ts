import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../profile/profil.model';

@Injectable({
    providedIn: 'root',

})
export class ProfileService {
    apiUrl = 'http://localhost:8000/api';

    constructor(private http: HttpClient,
        ){}
  

    getProfile(): Observable<Profile[]>{
        return this.http.get<Profile[]>(`${this.apiUrl}/profiles`);
    }

}