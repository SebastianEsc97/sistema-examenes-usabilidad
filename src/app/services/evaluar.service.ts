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

  public actualizarEvaluacion(evaluacionId: any) {
    return this.http.put(`${baserUrl}/evaluacion/`, evaluacionId)
  }

  public obtenerEvaluacion(evaluacionId: any) {
    return this.http.get(`${baserUrl}/evaluacion/${evaluacionId}`)
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

}
