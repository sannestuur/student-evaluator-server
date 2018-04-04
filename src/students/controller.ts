import {
  JsonController,
  Authorized,
  Post,
  Param,
  HttpCode,
  NotFoundError,
  Get,
  Body,
  Patch,
  Delete
} from "routing-controllers";
import Student from "./entity";
// import {IsBoard, isValidTransition, calculateWinner, finished} from './logic'
import { io } from "../index";

@JsonController()
export default class StudentController {
  @Authorized()
  @Get("/student/:id([0-9]+)")
  getStudent(@Param("id") id: number) {
    return Student.findOneById(id);
  }

  @Authorized()
  @Get("/students")
  getStudents() {
    return Student.find();
  }

  @Authorized()
  @Post("/students")
  @HttpCode(201)
  async createStudent(@Body() student: Student) {
    io.emit("action", {
      type: "UPDATE_STUDENT",
      payload: await Student.findOneById(student.id)
    });

    return student.save();
  }

  @Authorized()
  @Patch("/students/:id([0-9]+)")
  async updateStudent(
    @Param("id") id: number,
    @Body() update: Partial<Student>
  ) {
    const student = await Student.findOneById(id);
    if (!student) throw new NotFoundError("Cannot find student");

    return Student.merge(student, update).save();
  }

  @Authorized()
  @Delete("/student/:id([0-9]+)")
  async removeStudent(@Param("id") id: number) {
    const student = await Student.findOneById(id);
    if (!student) throw new NotFoundError("Cannot find student");
    student.remove();
    return "student succesfully deleted";
  }
}
