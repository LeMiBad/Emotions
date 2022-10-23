import { Module } from '@nestjs/common';
import { EmotionStateController } from './emotion-state.controller';
import { EmotionStateService } from './emotion-state.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmotionStateModel } from './emotion-state.model';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [EmotionStateController],
    providers: [EmotionStateService],
    imports: [
        SequelizeModule.forFeature([EmotionStateModel]),
        AuthModule,
        UsersModule,
    ],
})
export class EmotionStateModule {}
