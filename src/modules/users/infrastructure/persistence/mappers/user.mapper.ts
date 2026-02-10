import { User } from '@modules/users/domain/entities/user.entity';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPersistenceMapper {
  public readonly mapUserPersistenceToDomain = (user: UserEntity): User => {
    return new User(
      user.id,
      user.username,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.roles,
      user.createdAt,
      user.updatedAt,
    );
  };
}
