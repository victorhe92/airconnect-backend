import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { PasajerosService } from 'src/pasajeros/pasajeros.service';
import { VuelosService } from '../vuelos.service';
import { Reserva } from './entities/reserva.entity';

@Injectable()
export class ReservasService {
  reservas: Reserva[] = [];

  constructor(
    public readonly vuelosService: VuelosService,
    public readonly pasajerosService: PasajerosService,
  ) {}

  create(createReservaDto: CreateReservaDto) {
    const pasajero = this.pasajerosService.findOne(createReservaDto.pasajeroID);
    const vuelo = this.vuelosService.findOne(createReservaDto.vueloID);

    const reserva = new Reserva(
      this.reservas.length + 1,
      createReservaDto.codigoReserva,
      createReservaDto.fechaReserva,
      createReservaDto.estado,
      pasajero,
      vuelo,
    );
    this.reservas.push(reserva);
    return reserva;
  }

  findAll() {
    return `This action returns all reservas`;
  }

  findOne(id: number) {
    const reserva = this.reservas.find((Reserva) => reserva.id == id);
    if (reserva) {
      return reserva;
    }
    throw new NotFoundException('Id no encontrado');
  }

  update(id: number, updateReservaDto: UpdateReservaDto) {
    const reseva = this.findOne(id);
    reseva.estado = updateReservaDto.estado;
    return reseva;
  }

  remove(id: number) {
    this.findOne(id);
    this.reservas = this.reservas.filter((reserva) => reserva.id != id);
  }
}
