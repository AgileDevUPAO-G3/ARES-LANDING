import { environment } from '../../../environment/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Mesa} from '../../shared/models/mesa.model';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.baseUrl}/tables`);
  }
}
