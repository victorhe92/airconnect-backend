import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { Pasajero } from './entities/pasajero.entity';

@Injectable()
export class PasajerosService {
  pasajeros: Pasajero[] = [];

  constructor() {
    this.dummyData();
  }

  dummyData() {
    this.pasajeros = [
      new Pasajero(1, 'Juan', 'Pérez', 'juan.perez@example.com'),
      new Pasajero(2, 'María', 'López', 'maria.lopez@example.com'),
      new Pasajero(3, 'Carlos', 'Sánchez', 'carlos.sanchez@example.com'),
      new Pasajero(4, 'Ana', 'Torres', 'ana.torres@example.com'),
      new Pasajero(5, 'Luis', 'Gómez', 'luis.gomez@example.com'),
    ];
  }
  create(createPasajeroDto: CreatePasajeroDto) {
    if (
      this.pasajeros.find(
        (pasajero) => pasajero.email == createPasajeroDto.email,
      )
    ) {
      throw new BadRequestException('El email ya existe');
    }

    const pasajero: Pasajero = new Pasajero(
      this.pasajeros.length + 1,
      createPasajeroDto.nombre,
      createPasajeroDto.apellido,
      createPasajeroDto.email,
    );

    this.pasajeros.push(pasajero);
    return pasajero;
  }

  findAll() {
    return this.pasajeros;
  }

  findOne(id: number) {
    const pasajero = this.pasajeros.find((pasajero) => pasajero.id == id);
    if (pasajero) {
      return pasajero;
    }
    throw new NotFoundException('Id no encontrado');
  }

  remove(id: number) {
    const pasajero = this.findOne(id);
    const i = this.pasajeros.findIndex((pasajero) => pasajero.id == id);
    this.pasajeros.splice(i, 1);

    return pasajero;
  }
}
