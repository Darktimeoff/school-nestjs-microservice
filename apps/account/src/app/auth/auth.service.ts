import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UserRepository } from '../user/repositories/user.repository';
import { UserEntity } from '../user/entities/user.entity';
import { UserRole } from '@school-nestjs/interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {

    }

    async register({email, password, displayName}: RegisterDto) {
        const oldUser = await this.userRepository.findUserByEmail(email);

        if (oldUser) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const newUserEntity = await new UserEntity({
            email,
            displayName,
            role: UserRole.Student,
        }).setPassword(password);

        await this.userRepository.createUser(newUserEntity);

        return newUserEntity;
    }

    async validateUser({email, password}: LoginDto) {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            throw new HttpException('Incorrect email/password combination', HttpStatus.BAD_REQUEST);
        }

        const userEntity = new UserEntity(user);

        if (!(await userEntity.checkPassword(password))) {
            throw new HttpException('Incorrect email/password combination', HttpStatus.BAD_REQUEST);
        }

        return userEntity;
    }

    async login(id: string) {
        const token = await this.jwtService.signAsync({id}, {
            expiresIn: "1m"
        })

        return {
            access_token: token
        }
    }
}
