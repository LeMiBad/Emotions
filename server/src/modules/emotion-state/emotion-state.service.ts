import {
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    Scope,
} from '@nestjs/common';
import { SaveEmotionStateDto } from './dto/save-emotion-state.dto';
import { InjectModel } from '@nestjs/sequelize';
import { EmotionStateModel } from './emotion-state.model';
import { REQUEST } from '@nestjs/core';

import { Request } from 'express';
import { UsersService } from '../users/users.service';

@Injectable({ scope: Scope.REQUEST })
export class EmotionStateService {
    constructor(
        @InjectModel(EmotionStateModel)
        private emotionStateRepository: typeof EmotionStateModel,
        private usersService: UsersService,
        @Inject(REQUEST) private req: Request,
    ) {}

    async getEmotions() {
        const userEmotions = await this.usersService.getUserEmotions(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.req.user.name,
        );

        const response = {
            angry: 0,
            fear: 0,
            happy: 0,
            neutral: 0,
            sad: 0,
            surprise: 0,
        };

        userEmotions.forEach((userEmotion) => {
            response.angry += userEmotion.angry;
            response.fear += userEmotion.fear;
            response.happy += userEmotion.happy;
            response.neutral += userEmotion.neutral;
            response.sad += userEmotion.sad;
            response.surprise += userEmotion.surprise;
        });

        return response;
    }

    async saveEmotionState(dto: SaveEmotionStateDto) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const userName = this.req.user.name;

        if (!userName) {
            throw new HttpException('Нет юзернейма', HttpStatus.BAD_REQUEST);
        }

        return this.emotionStateRepository.create({ ...dto, userName });
    }
}
