import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"; 

@Entity('user') 
export class User {   

  @PrimaryGeneratedColumn()
  id?: number; 
  
  @Column()
  first_name?: string; 
  
  @Column()
  last_name?: string;

  @Column()
  email?: string; 
}