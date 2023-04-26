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

  public eliminarPrincipio(principioId:any){
    return this.http.delete(`${baserUrl}/principio/${principioId}`)
  }

  public obtenerPrincipio(principioId:any){
    return this.http.get(`${baserUrl}/principio/${principioId}`)
  }
  
  public actualizarPrincipio(principioId:any){
    return this.http.put(`${baserUrl}/principio/`, principioId)
  }

}
