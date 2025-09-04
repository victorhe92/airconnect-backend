import { Module } from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { VuelosController } from './vuelos.controller';
import { AeropuertosModule } from 'src/aeropuertos/aeropuertos.module';
import { ReservasService } from './reservas/reservas.service';
import { ReservasController } from './reservas/reservas.controller';
import { ReservasModule } from './reservas/reservas.module';
import { PasajerosService } from 'src/pasajeros/pasajeros.service';
import { PasajerosModule } from 'src/pasajeros/pasajeros.module';

@Module({
  controllers: [VuelosController, ReservasController],
  providers: [VuelosService, ReservasService],
  imports: [AeropuertosModule, PasajerosModule],
  exports: [VuelosService],
})
export class VuelosModule {}
