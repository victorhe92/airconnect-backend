import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateVueloDto } from './dto/update-vuelo.dto';
import { AeropuertosService } from 'src/aeropuertos/aeropuertos.service';
import { Aeropuerto } from 'src/aeropuertos/entities/aeropuerto.entity';
import { Vuelo } from './entities/vuelo.entity';
import { ApiQuery } from '@nestjs/swagger';

@Injectable()
export class VuelosService {
  vuelos: Vuelo[] = [];

  constructor(private readonly aeropuertosService: AeropuertosService) {
    this.dummyData();
  }

  create(createVueloDto: CreateVueloDto) {
    //Valido que ambos aeropuertos exiten. La excepción la controla el módulo aeropuerto.
    const origen = this.aeropuertosService.findByCode(createVueloDto.origen);
    const destino = this.aeropuertosService.findByCode(createVueloDto.destino);

    const vuelo: Vuelo = new Vuelo(
      this.vuelos.length + 1,
      createVueloDto.numeroVuelo,
      createVueloDto.fechaSalida,
      createVueloDto.duracionEstimada,
      origen,
      destino,
      'programado',
    );

    this.vuelos.push(vuelo);
    return vuelo;
  }
  @ApiQuery({
    name: 'estado',
    description: 'algo',
    required: true,
  })
  findAll(origen?: string, estado?: string) {
    let vuelosFiltrados: Vuelo[] = [];
    if (origen && estado) {
      vuelosFiltrados = this.vuelos.filter(
        (vuelo) => vuelo.origen.codigo == origen && vuelo.estado == estado,
      );
    } else if (origen && !estado) {
      vuelosFiltrados = this.vuelos.filter(
        (vuelo) => vuelo.origen.codigo == origen,
      );
    } else if (!origen && estado) {
      vuelosFiltrados = this.vuelos.filter((vuelo) => vuelo.estado == estado);
    } else {
      return this.vuelos;
    }

    return vuelosFiltrados;
  }

  findOne(id: number) {
    const vuelo = this.vuelos.find((vuelo) => vuelo.id == id);
    if (vuelo) {
      return vuelo;
    }
    throw new NotFoundException('Id no encontrado');
  }

  update(id: number, updateVueloDto: UpdateVueloDto) {
    const vuelo = this.findOne(id);
    vuelo.estado = updateVueloDto.estado;
    return vuelo;
  }

  dummyData() {
    this.vuelos = [
      new Vuelo(
        1,
        'AC100',
        new Date('2024-07-01T08:00:00Z'),
        120,
        new Aeropuerto(
          1,
          'Aeropuerto Internacional de la Ciudad de México',
          'MEX',
          'Ciudad de México',
        ),
        new Aeropuerto(
          2,
          'Aeropuerto Internacional de Cancún',
          'CUN',
          'Cancún',
        ),
        'programado',
      ),
      new Vuelo(
        2,
        'AC101',
        new Date('2024-07-01T10:30:00Z'),
        90,
        new Aeropuerto(
          2,
          'Aeropuerto Internacional de Cancún',
          'CUN',
          'Cancún',
        ),
        new Aeropuerto(
          3,
          'Aeropuerto Internacional de Guadalajara',
          'GDL',
          'Guadalajara',
        ),
        'en vuelo',
      ),
      new Vuelo(
        3,
        'AC102',
        new Date('2024-07-01T13:00:00Z'),
        180,
        new Aeropuerto(
          3,
          'Aeropuerto Internacional de Guadalajara',
          'GDL',
          'Guadalajara',
        ),
        new Aeropuerto(
          4,
          'Aeropuerto Internacional de Monterrey',
          'MTY',
          'Monterrey',
        ),
        'aterrizado',
      ),
      new Vuelo(
        4,
        'AC103',
        new Date('2024-07-01T15:45:00Z'),
        150,
        new Aeropuerto(
          4,
          'Aeropuerto Internacional de Monterrey',
          'MTY',
          'Monterrey',
        ),
        new Aeropuerto(
          5,
          'Aeropuerto Internacional de Tijuana',
          'TIJ',
          'Tijuana',
        ),
        'cancelado',
      ),
      new Vuelo(
        5,
        'AC104',
        new Date('2024-07-01T18:20:00Z'),
        200,
        new Aeropuerto(
          5,
          'Aeropuerto Internacional de Tijuana',
          'TIJ',
          'Tijuana',
        ),
        new Aeropuerto(
          1,
          'Aeropuerto Internacional de la Ciudad de México',
          'MEX',
          'Ciudad de México',
        ),
        'demorado',
      ),
    ];
  }
}
