import {EntityRepository, Repository} from 'typeorm';
import {RefreshToken} from "./models/refresh-token.model";

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
    createRefreshToken = async (options: object) => {
        return await this.save(options);
    };
}