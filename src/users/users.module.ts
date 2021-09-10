import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersSubscriber } from './users.subscriber';
import { PermissionModule } from './permission/permission.module';

@Module({
    imports: [PermissionModule, AuthModule, TypeOrmModule.forFeature([User, UserRepository])],
    providers: [UsersResolver, UsersSubscriber, UsersService, UserRepository, DateScalar],
    exports: [UsersService],
})
export class UsersModule {}
