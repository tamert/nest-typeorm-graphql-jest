import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm/index';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshToken } from './entitites/refresh-token.entity';

@Injectable()
export class RefreshTokenService {
    private refreshTokenRepository: RefreshTokenRepository;

    constructor(private readonly connection: Connection) {
        this.refreshTokenRepository = this.connection.getCustomRepository(RefreshTokenRepository);
    }

    async create(data: object): Promise<RefreshToken> {
        return await this.refreshTokenRepository.createRefreshToken(data);
    }

    async update(refresh: RefreshToken): Promise<RefreshToken> {
        return await this.refreshTokenRepository.save(refresh);
    }

    async findOne(data: object): Promise<RefreshToken> {
        return await this.refreshTokenRepository.findOne(data);
    }
}
