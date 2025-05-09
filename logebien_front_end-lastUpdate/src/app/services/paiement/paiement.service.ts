import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
interface PaymentResponse {
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
    apiURL: string = "http://www.aziz.com/payment/api/v1/payment"
  constructor(private http : HttpClient) { }

  

  generatePayment(amount: string, idContrat: number): Observable<PaymentResponse> {
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("idContrat", idContrat.toString());
  
    return this.http.post<PaymentResponse>(`${this.apiURL}/create`, formData).pipe(
      catchError(error => {
        console.error('Erreur API:', error);
        return throwError(() => new Error('Échec de la génération du paiement'));
      })
    );
  }

  confirmerPaiement(paymentId: string, payerId: string, idContrat: number): Observable<any> {
    return this.http.get(`${this.apiURL}/success/${idContrat}`, {
      params: {
        paymentId: paymentId,
        PayerID: payerId
      }
    });
  }
  
  

 verifypayment(id:string):Observable<any>{
  return this.http.get<any>(this.apiURL+"/verifypayment/"+id);
 }



}
