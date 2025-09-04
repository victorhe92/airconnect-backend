import { ApiProperty } from '@nestjs/swagger';

export class CreatePasajeroDto {
  @ApiProperty({ default: 'Victor' })
  nombre: string;
  @ApiProperty({ default: 'Hernandez' })
  apellido: string;
  @ApiProperty({ default: 'victorhe92@gmail.com' })
  email: string;
}
