import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: 'UUID', description: 'Login UUID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Email', description: 'Login Email' })
  @Column('text', {
    unique: true,
  })
  email: string;
  @ApiProperty({ example: 'Password', description: 'Login Password' })

  @Column('text', {
    select: false,
  })
  password: string;
  @ApiProperty({ example: 'FullName', description: 'Login FullName' })

  @Column('text')
  fullName: string;
  @ApiProperty({ example: 'IsActive', description: 'Login IsActive' })

  @Column('bool', {
    default: true,
  })
  isActive: boolean;
  @ApiProperty({ example: 'Role', description: 'Login Role' })

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];


  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  checkInputBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkInputBeforeUpdate() {
    this.checkInputBeforeInsert();
  }
}
