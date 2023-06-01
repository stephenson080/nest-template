import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/models/user.entity';
import { CreateUserDto, UserResponseDto } from './dtos/user.dtos';
import { hash } from 'bcrypt';
import { MessageResponse } from 'src/utils/types';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository : Repository<User> ){}

    async createUser(createUserDto : CreateUserDto){
        const existUser = await this.getUserByEmail(createUserDto.email)
        if (existUser) throw new ConflictException({message: `User exist with email: ${existUser.email}`})

        const hashedPass = await this.hashPassword(createUserDto.password)

        const newUser = this.userRepository.create({...createUserDto, password: hashedPass})

        return await this.userRepository.save(newUser)
    }

    async getUserByEmail(email: string){
        return await this.getUserBy('email', email)
    }

    private async getUserBy(id: string, value: string){
        return await this.userRepository.findOneBy({[id]: value})
    }

    private async hashPassword(password: string) {
        const promise = new Promise((res: (value: string) => void, reject) => {
          hash(password, 10, (err, hash) => {
            if (err) reject(err);
            res(hash);
          });
        });
    
        return await promise;
    }
}
