import { NextFunction, Request, Response } from 'express'
import { QueryFailedError } from 'typeorm'
import chalk from 'chalk'

function msg(message: string): string {
  return `TypeORM Error: ${message}`
}

async function ExpressErrorTypeOrm(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> {
  if (err instanceof QueryFailedError) {
    console.log(`${chalk.red('TypeORM Error:')} ${chalk.green(err.message)}`)

    return res.status(400).json({
      code: 400,
      message: msg(err.message),
    })
  }

  next(err)
}

export default ExpressErrorTypeOrm
