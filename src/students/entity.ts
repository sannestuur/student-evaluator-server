import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm'
import { IsString, MinLength, IsUrl} from 'class-validator';
import Batch from '../batches/entity'

export type Score = 'red' | 'yellow' | 'green'


@Entity()
export default class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text')
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('text')
  lastName: string

  @ManyToOne(_ => Batch, batch => batch.students, {eager:true})
  batch: Batch

  @IsUrl()
  @Column('text')
  photo: string

  @Column('json', {default: []})
  status: [{evaluationDate: Date, score: Score}]

  @Column('json', {default: []})
  remarks: [{evaluationDate: Date, remark: string}]


}
