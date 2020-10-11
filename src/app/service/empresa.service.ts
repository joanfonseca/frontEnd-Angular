import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Empresa } from '../models/empresa'
import { Sucursal } from '../models/sucursal'
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  selectedEmpresa: Empresa
  empresa: Empresa[]
  selectedSucursal: Sucursal
  sucursal: Sucursal[]
  readonly URL_API = 'http://localhost:3000/'
  constructor (private http: HttpClient) {
    this.selectedEmpresa = new Empresa()
    this.selectedSucursal = new Sucursal()
  }

  postEmpresa (empresa: Empresa) {
    return this.http.post(this.URL_API + 'e', empresa)
  }

  getEmpresas () {
    return this.http.get<Empresa[]>(this.URL_API + 'e')
  }

  deleteEmpresa (_id: string) {
    return this.http.delete(this.URL_API + 'e' + `/${_id}`)
  }
  putEmpresa (empresaN: Empresa) {
    console.log(empresaN);
    
    return this.http.put(this.URL_API + 'e' + `/${empresaN._id}`, empresaN)
  }
  //____________

  postSucursal (empresa: Sucursal) {
    return this.http.post(this.URL_API + 's', empresa)
  }

  getSucursales () {
    return this.http.get<Sucursal[]>(this.URL_API + 's')
  }
  putSucursal (empresa: Sucursal) {
    return this.http.put(this.URL_API + 's' + `/${empresa._id}`, empresa)
  }

  deleteSucursal (_id: string) {
    return this.http.delete(this.URL_API + 's' + `/${_id}`)
  }
}
