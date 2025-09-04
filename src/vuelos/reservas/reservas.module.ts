import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { PasajerosModule } from 'src/pasajeros/pasajeros.module';

@Module({
  controllers: [ReservasController],
  providers: [ReservasService],
  imports: [],
})
export class ReservasModule {}
