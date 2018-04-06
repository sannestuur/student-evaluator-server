import {
  JsonController,
  Authorized,
  Post,
  Param,
  HttpCode,
  Get,
  Body
} from "routing-controllers";
import Batch from "./entity";
// import Student from "../students/entity";

// import {IsBoard, isValidTransition, calculateWinner, finished} from './logic'
import { io } from "../index";

@JsonController()
export default class BatchController {
  @Authorized()
  @Get("/batches/:id([0-9]+)")
  getBatch(@Param("id") id: number) {
    return Batch.findOneById(id);
  }

  @Authorized()
  @Get("/batches")
  getBatches() {
    return Batch.find();
  }

  // @Authorized()
  // @Get("/batches/:id([0-9]+)")
  // getStudentsByBatch(@Param("id") id: number) {
  //     const student = await Student.find({ where: { batch: id } })
  //   return Batch.findOneById(id);
  // }

  @Authorized()
  @Post("/batches")
  @HttpCode(201)
  async createBatch(@Body() body: Batch) {
    const batch = await Batch.create(body).save()
    return batch
  }
}
