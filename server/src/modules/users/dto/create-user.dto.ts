import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'Egor Petrov' })
    @IsString()
    readonly name: string;
}
