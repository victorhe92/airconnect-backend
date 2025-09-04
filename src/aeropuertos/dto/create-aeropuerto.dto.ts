import { ApiProperty } from '@nestjs/swagger';

export class CreateAeropuertoDto {
  @ApiProperty({ default: 'Arturo Merino Benitez' })
  nombre: string;
  @ApiProperty({ default: 'SCL' })
  codigo: string;
  @ApiProperty({ default: 'Santiago' })
  ciudad: string;
}
