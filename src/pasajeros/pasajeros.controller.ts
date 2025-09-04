import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PasajerosService } from './pasajeros.service';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';

@Controller('pasajeros')
export class PasajerosController {
  constructor(private readonly pasajerosService: PasajerosService) {}

  @Post()
  create(@Body() createPasajeroDto: CreatePasajeroDto) {
    return this.pasajerosService.create(createPasajeroDto);
  }

  @Get()
  findAll() {
    return this.pasajerosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pasajerosService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pasajerosService.remove(+id);
  }
}
