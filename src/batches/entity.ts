import { BaseEntity, PrimaryColumn, Column, Entity, OneToMany } from 'typeorm'
import { IsDate } from 'class-validator';
import Student from '../students/entity'


@Entity()
export default class Batch extends BaseEntity {

  @PrimaryColumn()
  id: number

  @IsDate()
  @Column()
  startDate: string

  @IsDate()
  @Column()
  endDate: string

  @OneToMany(_ => Student, student => student.batch, {eager:true})
  students: Student[];

}
