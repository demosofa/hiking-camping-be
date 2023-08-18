import {
	Injectable,
	BadRequestException,
	NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { IUserService } from './user.interface';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ROLE } from '@common/enums';
import { RoleService } from '@resources/role/role.service';

@Injectable()
export class UserService implements IUserService {
	constructor(
		@InjectRepository(User) private userRepos: Repository<User>,
		private roleService: RoleService
	) {}

	async create(createUserDto: CreateUserDto) {
		const isExist = await this.userRepos.findOneBy({
			email: createUserDto.email,
		});
		if (isExist)
			throw new BadRequestException(
				'The user with this email is already existed'
			);
		let role = await this.roleService.findOne(ROLE.CUSTOMER);
		if (!role) {
			role = await this.roleService.findOne(ROLE.ADMIN);
			if (!role) role = await this.roleService.create({ name: ROLE.ADMIN });
			else role = await this.roleService.create({ name: ROLE.CUSTOMER });
		}
		const user = this.userRepos.create({ ...createUserDto, role });
		return this.userRepos.save(user);
	}

	async findAll() {
		return this.userRepos.find();
	}

	async findById(id: string) {
		const user = await this.userRepos.findOne({
			where: { id },
			relations: {
				role: true,
				cartItem: {
					variant: true,
				},
			},
		});
		if (!user) throw new NotFoundException('Can not find the user');
		return user;
	}

	async findOne(email: string) {
		const user = await this.userRepos.findOne({
			where: { email },
			relations: {
				role: true,
			},
		});
		if (!user) throw new NotFoundException('Can not find the user');
		return user;
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.findById(id);
		if (user.email != updateUserDto.email) {
			const isExist = await this.userRepos.findOneBy({
				email: updateUserDto.email,
			});
			if (isExist)
				throw new BadRequestException(
					'The user with this email is already existed'
				);
		}
		return this.userRepos.save({ ...user, ...updateUserDto });
	}

	async remove(id: string) {
		const { affected } = await this.userRepos.delete(id);
		if (!affected) throw new NotFoundException('Can not find the user');
	}
}
