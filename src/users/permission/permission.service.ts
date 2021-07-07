import {Injectable} from '@nestjs/common';
import {Connection} from "typeorm/index";
import {PermissionRepository} from "./permission.repository";
import {Permission} from "./entities/permission.entity";


@Injectable()
export class PermissionService {

    private permissionRepository: PermissionRepository;

    constructor(
        private readonly connection: Connection
    ) {
        this.permissionRepository = this.connection.getCustomRepository(PermissionRepository);
    }

    async create(data: object): Promise<Permission> {
        return await this.permissionRepository.createPermission(data);
    }

    async update(permission: Permission): Promise<Permission> {
        return await this.permissionRepository.save(permission);
    }

    async findOne(data: object): Promise<Permission> {
        return await this.permissionRepository.findOne(data);
    }

}

