
import { Request } from 'express';
import * as Yup from 'yup';
import { object, string, number, date, InferType } from 'yup';

class RequestValidator {
  async registerUser(req: Request) {
    const schema = Yup.object({
      name: string().required(),
      email: string().required(),
      password: string().required()
    });

    const payload = {
      clientId: req.params.client_id,
    };
    await schema.validate(payload);
    return validate(schema, payload);
  }
}
export default new RequestValidator();
