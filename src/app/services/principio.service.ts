import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PrincipioService {

  constructor(private http:HttpClient) { }

  public listarPrincipios(){
    return this.http.get(`${baserUrl}/principio/`)
  }

  public agregarPrincipio(principio:any){
    return this.http.post(`${baserUrl}/principio/`,principio)
  }
}
