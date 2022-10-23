import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';

import { UserModel } from '../users/users.model';
import { SaveEmotionStateDto } from './dto/save-emotion-state.dto';

interface CreationAttrs extends SaveEmotionStateDto {
    userName: string;
}

// сделать банк эмоций - много плюсов и удобно
@Table({ tableName: 'emotional-state' })
export class EmotionStateModel extends Model<EmotionStateModel, CreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    // обьединить бы в одну сущность
    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    angry: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    neutral: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    fear: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    happy: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    sad: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    surprise: number;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.STRING })
    userName: string;
}
