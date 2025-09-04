import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAeropuertoDto } from './dto/create-aeropuerto.dto';
import { Aeropuerto } from './entities/aeropuerto.entity';

@Injectable()
export class AeropuertosService {
  aeropuertos: Aeropuerto[] = [];

  constructor() {
    this.dummyData();
  }
  dummyData() {
    this.aeropuertos = [
      new Aeropuerto(
        1,
        'Aeropuerto Internacional Benito Juárez',
        'MEX',
        'Ciudad de México',
      ),
      new Aeropuerto(2, 'Aeropuerto Internacional de Cancún', 'CUN', 'Cancún'),
      new Aeropuerto(
        3,
        'Aeropuerto Internacional de Guadalajara',
        'GDL',
        'Guadalajara',
      ),
    ];
  }
  create(createAeropuertoDto: CreateAeropuertoDto) {
    if (
      this.aeropuertos.find(
        (aeropuerto) => aeropuerto.codigo == createAeropuertoDto.codigo,
      )
    ) {
      throw new BadRequestException('Codigo de aeropuerto ya existe');
    }

    let aeropuerto: Aeropuerto = new Aeropuerto(
      this.aeropuertos.length + 1,
      createAeropuertoDto.nombre,
      createAeropuertoDto.codigo,
      createAeropuertoDto.ciudad,
    );

    this.aeropuertos.push(aeropuerto);

    return aeropuerto;
  }

  findAll() {
    return this.aeropuertos;
  }

  findOne(id: number) {
    const aeropuerto = this.aeropuertos.find(
      (aeropuerto) => aeropuerto.id == id,
    );

    if (aeropuerto) return aeropuerto;

    throw new NotFoundException('Id no encontrado');
  }

  findByCode(codigo: string) {
    const aeropuerto = this.aeropuertos.find(
      (aeropuerto) => aeropuerto.codigo == codigo,
    );

    if (aeropuerto) return aeropuerto;

    throw new NotFoundException('Codigo no encontrado');
  }
}
