import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })

export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id!: number

    @Column()
    nick_name!: string;

    @Column()
    job!: string;

    @Column()
    avatar!: string;

    @Column()
    introduce!: string;
}