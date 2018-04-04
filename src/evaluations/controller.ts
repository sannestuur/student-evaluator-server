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
import Evaluation from "./entity";
// import {IsBoard, isValidTransition, calculateWinner, finished} from './logic'
import { io } from "../index";

@JsonController()
export default class EvaluationController {
  @Authorized()
  @Get("/evaluation/:id([0-9]+)")
  getEvaluation(@Param("id") id: number) {
    return Evaluation.findOneById(id);
  }

  @Authorized()
  @Get("/evaluations")
  getEvaluations() {
    return Evaluation.find();
  }

  @Authorized()
  @Post("/evaluations")
  @HttpCode(201)
  async createEvaluation(@Body() evaluation: Evaluation) {
    io.emit("action", {
      type: "UPDATE_EVALUATIONS",
      payload: await Evaluation.findOneById(evaluation.id)
    });

    return evaluation.save();
  }

  @Authorized()
  @Patch("/evaluations/:id([0-9]+)")
  async updateEvaluation(
    @Param("id") id: number,
    @Body() update: Partial<Evaluation>
  ) {
    const evaluation = await Evaluation.findOneById(id);
    if (!evaluation) throw new NotFoundError("Cannot find evaluation");

    return Evaluation.merge(evaluation, update).save();
  }

  @Authorized()
  @Delete("/evaluation/:id([0-9]+)")
  async removeEvaluation(@Param("id") id: number) {
    const evaluation = await Evaluation.findOneById(id);
    if (!evaluation) throw new NotFoundError("Cannot find evaluation");
    evaluation.remove();
    return "evaluation succesfully deleted";
  }
}
