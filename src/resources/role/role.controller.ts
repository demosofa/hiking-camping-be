import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ROLE } from '@common/enums';

@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Post()
	create(@Body() createRoleDto: CreateRoleDto) {
		return this.roleService.create(createRoleDto);
	}

	@Get()
	findAll() {
		return this.roleService.findAll();
	}

	@Get(':name')
	findOne(@Param('name') name: ROLE) {
		return this.roleService.findOne(name);
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateRoleDto: UpdateRoleDto
	) {
		return this.roleService.update(id, updateRoleDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.roleService.remove(id);
	}
}
