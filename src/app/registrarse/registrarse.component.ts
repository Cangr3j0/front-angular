import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { UsuarioServiceService } from '../usuario-service.service';
import { PasswordVerificationValidator } from './PasswordVerificationValidator';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
errores:string[]=null;
submitted:boolean=false;
usuario:Usuario;
  form = new FormGroup({
    nombre: new FormControl('',[Validators.required,Validators.minLength(2)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    confirmPassword: new FormControl('',Validators.required),
    checkCondiciones: new FormControl(false,Validators.requiredTrue)
 },{validators:PasswordVerificationValidator.coincidenPasswords});

 usuarioService:UsuarioServiceService;

  constructor(usuarioService:UsuarioServiceService,private route:ActivatedRoute,private router:Router) { 
this.usuarioService=usuarioService;
this.usuario=new Usuario();
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.submitted=true;
// Iterar sobre objetos
//     Found out that Object.keys can handle this..

//     Object.keys(this.form.controls).forEach(key => {
//       this.form.get(key).markAsDirty();
//     });
// For Angular 8+, use the following (based on Michelangelo answer):

//     Object.keys(this.form.controls).forEach(key => {
//       this.form.controls[key].markAsDirty();
//     });

    //por cada FormControl (this.form.get('email'),this.form.get('name') etcetera)
    // del formgroup si hay errores en true entonces 
    if(this.form.status=="INVALID"){
    // for (const control in this.form.controls) {
    //    var formcontrol=this.form.get(control);
    //   if (formcontrol.status=='INVALID'){
    //     this.form.get(control).markAsDirty();
    //     console.log("El control "+control+" es invalido. ");
    //     for(const error in formcontrol.errors){
    //      console.log(error);
    //       if(error==='required'){
    //         const requirederror="El campo es vacío."
    //       }
    //       else if(error=="email"){
    //         const errormail="El mail es invalido."
    //       }
    //     }
    //   }
    // }
  }else{
    console.log(this.form);
    console.log(this.form.get('email'));
    this.usuario.nombre=this.form.get('nombre').value;
    this.usuario.password=this.form.get('password').value;
    this.usuario.email=this.form.get('email').value;
    console.log("usuario: "+this.usuario);
    this.usuarioService.createUser(this.usuario).subscribe(result=>this.router.navigate(['/']));}
  }

}

