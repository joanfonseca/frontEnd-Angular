import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Empresa } from 'src/app/models/empresa'
import { EmpresaService } from '../../service/empresa.service'
import { Observable } from 'rxjs/internal/Observable'
import { Sucursal } from 'src/app/models/sucursal'

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
  empresa: FormGroup
  sucursal: FormGroup
  list: Array<Empresa> = []
  list2: Array<Sucursal> = []
  id_aux: Empresa
  sucur_aux: Sucursal
  constructor (public empresaService: EmpresaService) {
    this.empresa = this.createForm()
    this.sucursal = this.createForm1()
  }

  createForm () {
    return new FormGroup({
      nombreCtrl: new FormControl('')
    })
  }
  createForm1 () {
    return new FormGroup({
      nombreCtrl: new FormControl(''),
      idEmpresaCtrl: new FormControl('')
    })
  }
  save () {
    let empresa = new Empresa()
    empresa.nombre = this.empresa.value.nombreCtrl
    this.empresaService.postEmpresa(empresa).subscribe(data => {
      console.log(data)
    })
    this.update()
  }
  saveS () {
    let sucursal = new Sucursal()
    sucursal.nombre = this.sucursal.value.nombreCtrl
    sucursal.id_empresa = this.sucursal.value.idEmpresaCtrl
    this.empresaService.postSucursal(sucursal).subscribe(data => {
      console.log(data)
    })
    this.update()
  }
  delete (empresaN: Empresa) {
    this.empresaService.deleteEmpresa(empresaN._id).subscribe(data => {
      console.log(data)
    })
    this.update()
  }
  delete2 (sucursal: Sucursal) {
    this.empresaService.deleteSucursal(sucursal._id).subscribe(data => {
      console.log(data)
    })
    this.update()
  }

  editar (empresaN: Empresa) {
    this.id_aux = empresaN
    this.empresa.get('nombreCtrl').setValue('' + empresaN.nombre)
  }
  actualizar () {
    if (this.id_aux != '' && this.id_aux != undefined) {
      this.id_aux.nombre = this.empresa.value.nombreCtrl
      this.empresaService.putEmpresa(this.id_aux).subscribe(data => {
        console.log(data)
      })
      this.id_aux = undefined
      this.update()
    } else {
      console.log('no ha cargado ninguna empresa')
    }
  }
  editar2 (sucursl: Sucursal) {
    this.sucur_aux = sucursl
    this.sucursal.get('nombreCtrl').setValue('' + sucursl.nombre)
    this.sucursal.get('idEmpresaCtrl').setValue('' + sucursl.id_empresa)
  }
  actualizar2 () {
    if (this.sucur_aux != undefined) {
      this.sucur_aux.nombre = this.sucursal.value.nombreCtrl
      this.sucur_aux.id_empresa = this.sucursal.value.idEmpresaCtrl
      this.empresaService.putSucursal(this.sucur_aux).subscribe(data => {
        console.log(data)
      })
      this.update()
      this.sucur_aux = undefined
    } else {
      console.log('no ha cargado ninguna empresa')
    }
  }

  desa (sucursl: Sucursal) {
    sucursl.id_empresa = ''
    this.empresaService.putSucursal(sucursl).subscribe(data => {
      console.log(data)
    })
    this.update()
  }
  ngOnInit (): void {
    this.update()
  }
  update () {
    this.empresaService.getEmpresas().subscribe(data => {
      this.list = data
    })
    this.empresaService.getSucursales().subscribe(data => {
      this.list2 = data
    })
    this.empresa.reset()
    this.sucursal.reset()
  }
  cargar () {
    this.empresaService.getEmpresas().subscribe(data => {
      this.list = data
    })
  }
}
