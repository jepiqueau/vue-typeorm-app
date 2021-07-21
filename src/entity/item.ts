import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('item')
export class Item {
	@PrimaryGeneratedColumn()
	id = 0;

	@Column({nullable: false})
	name!: string;

	@Column({nullable: false})
	phoneNumber!: number;
}
