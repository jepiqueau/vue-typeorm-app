import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"; 
import {Post} from "@/entity/post";

@Entity('author') 
export class Author {   

  @PrimaryGeneratedColumn()
  id!: number; 
  
  @Column()
  name!: string; 
  
  @Column({nullable: true})
  birthday!: string;

  @Column()
  email!: string; 

  @OneToMany(type => Post, post => post.author)
  posts!: Post[];

}