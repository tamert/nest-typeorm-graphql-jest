import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from './entitites/refresh-token.entity';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
    createRefreshToken = async (refreshToken: RefreshToken) => {
        return await this.save(refreshToken);
    };
}
