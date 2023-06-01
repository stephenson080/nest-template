import { Roles } from 'src/utils/types';
import {
  Column,
  Entity,
  Generated,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @Generated('uuid')
  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @Column({ type: String, nullable: false, unique: true })
  email: string;
  @Column({type: String, nullable:true})
  phone: string

  @Column({ type: String, nullable: true })
  password: string;

  @Column({ type: String, nullable: true })
  fullName: string;

  @Column({ type: String, nullable: true })
  token: string;

  @Column({ type: Boolean, default: true })
  isActive: boolean;

  @Column({ type: Boolean, default: false })
  isVerified: boolean;

  @Column({ enum: Roles, default: Roles.USER })
  role: Roles;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
