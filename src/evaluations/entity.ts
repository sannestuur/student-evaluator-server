import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm'
import { IsString, IsDate} from 'class-validator';
import Student from '../students/entity'
import User from '../users/entity'


export type Score = 'red' | 'yellow' | 'green'


@Entity()
export default class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsDate()
  @Column()
  Date: string

  @Column()
  status: Score

  @IsString()
  @Column({ nullable: true })
  remarks: string

  @ManyToOne(_ => Student, student => student.evaluations)
  student: Student

  @ManyToOne(_ => User, user => user.evaluations)
  user: User
}
