import { ApiProperty } from '@nestjs/swagger';

export class CreateVueloDto {
  @ApiProperty({ default: 'LA401' })
  numeroVuelo: string;
  @ApiProperty({ default: '2025-09-10T17:00:00.000Z' })
  fechaSalida: Date;
  @ApiProperty({ default: '3' })
  duracionEstimada: number;
  @ApiProperty({ default: 'MEX' })
  origen: string;
  @ApiProperty({ default: 'CUN' })
  destino: string;
}
