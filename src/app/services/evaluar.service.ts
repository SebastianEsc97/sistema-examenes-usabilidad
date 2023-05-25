import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class EvaluarService {

  constructor(private http: HttpClient) { }

  public listarEvaluaciones() {
    return this.http.get(`${baserUrl}/evaluacion/`)
  }

  public agregarEvaluacion(evaluacion: any) {
    return this.http.post(`${baserUrl}/evaluacion/`, evaluacion)
  }

  public actualizarEvaluacion(evaluacion: any) {
    return this.http.put(`${baserUrl}/evaluacion/`, evaluacion)
  }

  public obtenerEvaluacion(evaluacionId: any) {
    return this.http.get(`${baserUrl}/evaluacion/${evaluacionId}`)
  }

  public eliminarEvaluacion(evaluacionId: any) {
    return this.http.delete(`${baserUrl}/evaluacion/${evaluacionId}`)
  }
  public obtenerEvaluacionPorUsuario(usuarioId: any) {
    return this.http.get(`${baserUrl}/evaluacion/usuario/${usuarioId}`)
  }

  public agregarPrincipioEvaluacion(principioEvaluacion: any) {
    return this.http.post(`${baserUrl}/principiosevaluaciones/`, principioEvaluacion)
  }

  public obtenerPrincipioEvaluacionxEvaluacion(evaluacionId: any){
    return this.http.get(`${baserUrl}/principiosevaluaciones/evaluacion/${evaluacionId}`)
  }

  public actualizarPrincipioEvaluacion(princpioEvaluacion: any) {
    return this.http.put(`${baserUrl}/principiosevaluaciones/`, princpioEvaluacion)
  }
}
