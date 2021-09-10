import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from './entitites/refresh-token.entity';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
    createRefreshToken = async (options: object) => {
        return await this.save(options);
    };
}
