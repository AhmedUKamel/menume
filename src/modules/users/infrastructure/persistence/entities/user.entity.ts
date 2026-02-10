import type { NonEmptyReadonlyArray } from '@common';
import { UserRole } from '@modules/users/domain/enums/user-role.enum';
import {
  Index,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
  orderBy: {
    createdAt: 'ASC',
  },
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  declare public readonly id: string;

  @Index('uq_users_username', { unique: true })
  @Column({ type: 'varchar', length: 100, name: 'username' })
  declare public readonly username: string;

  @Column({ type: 'varchar', length: 100, name: 'first_name' })
  declare public readonly firstName: string;

  @Column({ type: 'varchar', length: 100, name: 'last_name' })
  declare public readonly lastName: string;

  @Index('uq_users_email', { unique: true })
  @Column({ type: 'varchar', length: 150, name: 'email' })
  declare public readonly email: string;

  @Column({ type: 'varchar', length: 128, name: 'password' })
  declare public readonly password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    enumName: 'user_role',
    name: 'roles',
    array: true,
  })
  declare public readonly roles: NonEmptyReadonlyArray<UserRole>;

  @Index('udx_users_created_at')
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  declare public readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  declare public readonly updatedAt: Date;
}
