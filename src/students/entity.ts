import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { IsString, MinLength, IsUrl} from 'class-validator';
import Batch from '../batches/entity'
import Evaluation from '../evaluations/entity'

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

  @ManyToOne(_ => Batch, batch => batch.students)
  batch: Batch

  @IsUrl()
  @Column('text')
  photo: string

  @OneToMany(_ => Evaluation, evaluation => evaluation.student)
  evaluations: Evaluation[]

}
