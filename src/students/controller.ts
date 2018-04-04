// import {
//   JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
//   Body, Patch
// } from 'routing-controllers'
// import User from '../users/entity'
// import { Batch, Player, Board } from './entities'
// // import {IsBoard, isValidTransition, calculateWinner, finished} from './logic'
// import { Validate } from 'class-validator'
// import {io} from '../index'
//
// class BatchUpdate {
//
//   @Validate(IsBoard, {
//     message: 'Not a valid board'
//   })
//   board: Board
// }
//
// @JsonController()
// export default class BatchController {
//
//   @Authorized()
//   @Post('/batches')
//   @HttpCode(201)
//   async createBatch(
//     @CurrentUser() user: User
//   ) {
//     const entity = await Batch.create().save()
//
//     await Player.create({
//       batch: entity,
//       user,
//       symbol: 'x'
//     }).save()
//
//     const batch = await Batch.findOneById(entity.id)
//
//     io.emit('action', {
//       type: 'ADD_BATCH',
//       payload: batch
//     })
//
//     return batch
//   }
//
//   @Authorized()
//   @Post('/batches/:id([0-9]+)/players')
//   @HttpCode(201)
//   async joinBatch(
//     @CurrentUser() user: User,
//     @Param('id') batchId: number
//   ) {
//     const batch = await Batch.findOneById(batchId)
//     if (!batch) throw new BadRequestError(`Batch does not exist`)
//     if (batch.status !== 'pending') throw new BadRequestError(`Batch is already started`)
//
//     batch.status = 'started'
//     await batch.save()
//
//     const player = await Player.create({
//       batch,
//       user,
//       symbol: 'o'
//     }).save()
//
//     io.emit('action', {
//       type: 'UPDATE_BATCH',
//       payload: await Batch.findOneById(batch.id)
//     })
//
//     return player
//   }
//
//   @Authorized()
//   // the reason that we're using patch here is because this request is not idempotent
//   // http://restcookbook.com/HTTP%20Methods/idempotency/
//   // try to fire the same requests twice, see what happens
//   @Patch('/batches/:id([0-9]+)')
//   async updateBatch(
//     @CurrentUser() user: User,
//     @Param('id') batchId: number,
//     @Body() update: BatchUpdate
//   ) {
//     const batch = await Batch.findOneById(batchId)
//     if (!batch) throw new NotFoundError(`Batch does not exist`)
//
//     const player = await Player.findOne({ user, batch })
//
//     if (!player) throw new ForbiddenError(`You are not part of this batch`)
//     if (batch.status !== 'started') throw new BadRequestError(`The batch is not started yet`)
//     if (player.symbol !== batch.turn) throw new BadRequestError(`It's not your turn`)
//     if (!isValidTransition(player.symbol, batch.board, update.board)) {
//       throw new BadRequestError(`Invalid move`)
//     }
//
//     const winner = calculateWinner(update.board)
//     if (winner) {
//       batch.winner = winner
//       batch.status = 'finished'
//     }
//     else if (finished(update.board)) {
//       batch.status = 'finished'
//     }
//     else {
//       batch.turn = player.symbol === 'x' ? 'o' : 'x'
//     }
//     batch.board = update.board
//     await batch.save()
//
//     io.emit('action', {
//       type: 'UPDATE_BATCH',
//       payload: batch
//     })
//
//     return batch
//   }
//
//   @Authorized()
//   @Get('/batches/:id([0-9]+)')
//   getBatch(
//     @Param('id') id: number
//   ) {
//     return Batch.findOneById(id)
//   }
//
//   @Authorized()
//   @Get('/batches')
//   getBatches() {
//     return Batch.find()
//   }
// }
