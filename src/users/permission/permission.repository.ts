import { EntityRepository, Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
    createPermission = async (permission: Permission) => {
        return await this.save(permission);
    };
}
