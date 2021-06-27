import {EntityRepository, Repository} from 'typeorm';
import {Permission} from "./models/permission.model";

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
    createPermission = async (options: object) => {
        return await this.save(options);
    };
}
