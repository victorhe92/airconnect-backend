export class Aeropuerto {
  id: number;
  nombre: string;
  codigo: string;
  ciudad: string;

  constructor(id: number, nombre: string, codigo: string, ciudad: string) {
    this.id = id;
    this.nombre = nombre;
    this.codigo = codigo;
    this.ciudad = ciudad;
  }
}
