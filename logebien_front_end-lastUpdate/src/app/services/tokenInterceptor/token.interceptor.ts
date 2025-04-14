import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Liste des URL à exclure
    const toExclude = ['/login', '/register'];

    // Vérification si l'URL de la requête contient l'une des routes à exclure
    const shouldExclude = toExclude.some(excludedUrl => request.url.includes(excludedUrl));

    // Si l'URL ne correspond à aucune route à exclure, on ajoute le token dans l'en-tête Authorization
    if (!shouldExclude) {
      const jwt = localStorage.getItem('jwt'); // Récupérer le JWT depuis le localStorage

      if (jwt) {
        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${jwt}`
          }
        });
        return next.handle(clonedRequest); // Passer la requête modifiée à l'étape suivante
      }
    }

    // Si aucune modification n'est nécessaire, renvoyer la requête sans modification
    return next.handle(request);
  }
}






