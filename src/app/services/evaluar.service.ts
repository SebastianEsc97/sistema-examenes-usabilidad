import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class EvaluarService {

  constructor(private http:HttpClient) { }

  public listarEvaluaciones(){
    return this.http.get(`${baserUrl}/evaluacion/`)
  }

  public agregarEvaluaciones(evaluacion:any){
    return this.http.post(`${baserUrl}/evaluacion/`,evaluacion)
  }

  public actualizarEvaluacion(evaluacionId:any){
    return this.http.put(`${baserUrl}/evaluacion/`, evaluacionId)
  }

  public obtenerEvaluacionUsuario(usuarioId:any){
    return this.http.get(`${baserUrl}/evaluacion/usuario/${usuarioId}`)
  }

  public agregarPrincipioEvaluacion(principioEvaluacion:any){
    return this.http.post(`${baserUrl}/principiosevaluaciones/`,principioEvaluacion)
  }

}
