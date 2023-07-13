import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl = "http://16.171.143.229:8080";

  constructor(private http: HttpClient) {  }


  findAll() {
    return this.http.get<Client[]>(`${this.apiUrl}/listClients`);
  }

  delete(id: any){
    return this.http.delete(`${this.apiUrl}/deleteClient/${id}`);
  }

  persist(client: any) {
    return this.http.post<Client>(`${this.apiUrl}/saveClient`, client);
  }

  update(id:any, data:any){
    this.http.put(`${this.apiUrl}/updateClient/${id}`, data).subscribe();
  }
  
  getById(id: any){
    return this.http.get<Client>(`${this.apiUrl}/getClientById/${id}`);
  }
}
