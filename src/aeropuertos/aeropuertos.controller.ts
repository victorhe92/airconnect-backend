import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AeropuertosService } from './aeropuertos.service';
import { CreateAeropuertoDto } from './dto/create-aeropuerto.dto';

@Controller('aeropuertos')
export class AeropuertosController {
  constructor(private readonly aeropuertosService: AeropuertosService) {}

  @Post()
  create(@Body() createAeropuertoDto: CreateAeropuertoDto) {
    return this.aeropuertosService.create(createAeropuertoDto);
  }

  @Get()
  findAll() {
    return this.aeropuertosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aeropuertosService.findOne(+id);
  }
}
