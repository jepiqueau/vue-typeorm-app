import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import {Author} from "@/entity/author";
import {Category} from "@/entity/category";

@Entity('post')
export class Post {
	@PrimaryGeneratedColumn()
	id!: number;

    @Column()
    title!: string;

    @Column("text")
    text!: string;

    @ManyToMany(type => Category, {
		cascade: ['insert']
	})
	@JoinTable()
	categories!: Category[];
  
  
	@ManyToOne(type => Author, author => author.posts, {
		cascade: ['insert']
	})
	author!: Author;
  
}
