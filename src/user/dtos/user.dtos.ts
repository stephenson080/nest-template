import {IsNotEmpty, IsString, IsEmail, IsArray, IsBoolean} from 'class-validator'
import {Exclude} from 'class-transformer'
import {ApiProperty} from '@nestjs/swagger'
import {Roles} from '../../utils/types'
// import { PersonResponseDto } from 'src/person/personDto'
export class CreateUserDto {

    @ApiProperty({type: String, required: true})
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({type: String, required: true})
    @IsString()
    fullName: string

    @ApiProperty({type: String, required: true})
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({type: String, enum: Roles, required: false})
    role?: Roles

}

export class UserResponseDto {
    @ApiProperty({type: String})
    userId: string

    // @ApiProperty()
    // person: PersonResponseDto

    @ApiProperty({type: String, enum: Roles})
    role: Roles

    @ApiProperty({type: Boolean})
    isVerified:boolean


    @ApiProperty({type: String})
    isActive: boolean

    @Exclude()
    password:string

    @Exclude()
    token:string

    @ApiProperty({type: String})
    createdAt: Date

    @Exclude()
    updatedAt: Date

    constructor(user: Partial<any>){
        Object.assign(this, user)
        delete this.password
        delete this.token
    }
}

export class LoginUserDto {
    @ApiProperty({type: String})
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty({type: String})
    @IsString()
    @IsNotEmpty()
    password: string
}

export class LoggedInUserDto{
    @ApiProperty({type: String})
    access_token: string
}