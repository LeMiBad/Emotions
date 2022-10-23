import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserModel) private userRepository: typeof UserModel,
    ) {}

    async createUser(dto: CreateUserDto) {
        return await this.userRepository.create(dto);
    }

    async getUserByName(name: string) {
        return await this.userRepository.findByPk(name);
    }

    async getUserEmotions(name: string) {
        const user = await this.userRepository.findByPk(name, {
            include: 'emotionStates',
        });

        return await user.$get('emotionStates');
    }

    async getAllUsers() {
        return await this.userRepository.findAll();
    }
}
