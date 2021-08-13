import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {User} from "@/entity/user";

@Entity('item')
export class Item {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column({unique: true})
	phoneNumber!: number;

	@ManyToOne(type => User, user => user.items, {
		cascade: ['insert']
	})
	user!: User;
  
}
