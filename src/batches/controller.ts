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
  @Post("/batches")
  @HttpCode(201)
  async createBatch(@Body() batch: Batch) {
    io.emit("action", {
      type: "UPDATE_BATCH",
      payload: await Batch.findOneById(batch.id)
    });

    return batch.save();
  }
}