import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('item')
export class Item {
	@PrimaryGeneratedColumn()
	id = 0;

	@Column()
	name!: string;

	@Column()
	phoneNumber!: number;
}
