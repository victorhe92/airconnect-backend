import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateVueloDto } from './dto/update-vuelo.dto';

@Controller('vuelos')
export class VuelosController {
  constructor(private readonly vuelosService: VuelosService) {}

  @Post()
  create(@Body() createVueloDto: CreateVueloDto) {
    return this.vuelosService.create(createVueloDto);
  }

  @Get()
  findAll(@Query('origen') origen?: string, @Query('estado') estado?: string) {
    return this.vuelosService.findAll(origen, estado);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vuelosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVueloDto: UpdateVueloDto) {
    return this.vuelosService.update(+id, updateVueloDto);
  }
}
