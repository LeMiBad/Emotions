import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { UserModel } from '../users/users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto);

        return this.generateToken(user);
    }

    async validateUser(dto: CreateUserDto) {
        const user = await this.userService.getUserByName(dto.name);

        if (!user) {
            throw new UnauthorizedException({
                message: 'Пользователя с таким именем нет',
            });
        }

        return user;
    }

    async registration(dto: CreateUserDto) {
        const isUserExists = Boolean(
            await this.userService.getUserByName(dto.name),
        );

        // МОЖНО НАСЫПАТЬ СОЛИ, ЧТОБЫ НИ У КОГО ТАКОГО НЕ ВОЗНИКЛО
        if (isUserExists) {
            throw new HttpException(
                `Погоняло ${dto.name} уже занято`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.userService.createUser(dto);
        return this.generateToken(user);
    }

    generateToken(user: UserModel) {
        const payload = { name: user.name };

        return {
            token: this.jwtService.sign(payload),
        };
    }
}
