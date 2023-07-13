import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heartbeat } from '../models/heartbeat';

@Injectable({
  providedIn: 'root'
})
export class HeartbeatService {
  apiUrl = "http://16.171.143.229:8080";

  constructor(private http: HttpClient) { }

  persist(heartbeat: any) {
    console.log(heartbeat)
    return this.http.post<Heartbeat>(`${this.apiUrl}/addHeartbeatClient`, heartbeat);
  }

  findAllById(id: any) {
    return this.http.get<Heartbeat[]>(`${this.apiUrl}/getHeartbeatsByClient/${id}?pageNo=0&pageSize=5`);
  }
}
