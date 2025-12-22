import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validationMiddleware = (type: any) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const object = plainToInstance(type, req.body);


    validate(object).then((errors: ValidationError[]) => {
      if (errors.length > 0) {

        const message = errors.map((error) => Object.values(error.constraints || {})).join(', ');
        res.status(400).json({ error: message });
      } else {
        next();
      }
    });
  };
};