import {EntityRepository, Repository} from 'typeorm';
import {Permission} from "./entities/permission.entity";

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
    createPermission = async (options: object) => {
        return await this.save(options);
    };
}
