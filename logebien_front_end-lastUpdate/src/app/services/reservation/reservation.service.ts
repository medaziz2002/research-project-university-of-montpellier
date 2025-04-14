import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8888/microservice-logement/api/v1/reservations'; // adapte selon ton backend

  constructor(private http: HttpClient) {}

  // Ajouter une réservation
  addReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, reservation);
  }

  // Récupérer toutes les réservations
  getAllReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Récupérer une réservation par ID
  getReservationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Supprimer une réservation
  deleteReservation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // Modifier une réservation
  updateReservation(id: number, reservation: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, reservation);
  }
}
