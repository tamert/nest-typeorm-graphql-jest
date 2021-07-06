import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { IsString, IsUUID, MinLength } from 'class-validator';
import {User} from "../../../users/models/users.model";

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    @Index({ unique: true })
    @IsString()
    @MinLength(64)
    public refreshToken: string;

    @Column({
        nullable: false,
        type: 'timestamp',
    })
    public refreshTokenExpiresAt: Date;

    @Index()
    @Column('uuid', { nullable: false })
    @IsUUID()
    public userId: string;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'userId' })
    public user: User;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
