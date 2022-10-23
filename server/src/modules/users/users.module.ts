import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './users.model';
import { AuthModule } from '../auth/auth.module';
import { EmotionStateModel } from '../emotion-state/emotion-state.model';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([UserModel, EmotionStateModel]),
        forwardRef(() => AuthModule),
    ],
    exports: [UsersService],
})
export class UsersModule {}
