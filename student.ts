export class Student {
    codigo: string;
    cedula: string;
    edad: string;
    direccion: string;
    telefono: number;
  
    constructor(codigo: string, cedula: string, edad: string, direccion: string, telefono: number) {
      this.codigo = codigo;
      this.cedula = cedula;
      this.edad = edad;
      this.direccion = direccion;
      this.telefono = telefono;
    }
  }