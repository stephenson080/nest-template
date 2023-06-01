import { ApiProperty } from "@nestjs/swagger";

export enum Roles {
    SUPER_ADMIN='SUPER_ADMIN', ADMIN='ADMIN', USER='USER', AGENT='AGENT'
}

export class MessageResponse<T>{
    @ApiProperty({type: Boolean})
    status: boolean

    @ApiProperty({type: String})
    message: string

    data?: T
}