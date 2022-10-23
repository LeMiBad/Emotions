import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { EmotionStateModel } from '../emotion-state/emotion-state.model';
import { CreateUserDto } from './dto/create-user.dto';

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, CreateUserDto> {
    @ApiProperty({ example: 'Egor Petrov', description: 'Имечко' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    name: string;

    @HasMany(() => EmotionStateModel)
    emotionStates: EmotionStateModel[];
}
