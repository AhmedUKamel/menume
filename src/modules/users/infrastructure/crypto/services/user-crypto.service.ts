import { IUserCryptoService } from '@modules/users/domain/services/user-crypto.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserCryptoService implements IUserCryptoService {
  private readonly saltRound: number = 10;

  public async hashPassword(plain: string): Promise<string> {
    return await bcrypt.hash(plain, this.saltRound);
  }

  public async verifyPassword(plain: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plain, hash);
  }
}
