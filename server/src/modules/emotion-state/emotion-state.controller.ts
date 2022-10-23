import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { EmotionStateService } from './emotion-state.service';
import { SaveEmotionStateDto } from './dto/save-emotion-state.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('emotion-state')
export class EmotionStateController {
    constructor(private emotionStateService: EmotionStateService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getEmotionState() {
        return this.emotionStateService.getEmotions();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    saveEmotionState(@Body() dto: SaveEmotionStateDto) {
        return this.emotionStateService.saveEmotionState(dto);
    }
}
