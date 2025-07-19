import bcrypt from 'bcrypt';

import client from '#db/client.js';
import loginSchema from '#schemas/loginUserSchema.js';

import successResponse from '#utility/Responses/successResponse.js';
import errorResponse from '#utility/Responses/errorResponse.js';

async function login(app) {
  app.post('/login', { schema: loginSchema }, async (req, res) => {
    let response = await validateUser(req.body);
    app.log[response.success ? 'info' : 'error'](response.message);
    return res.code(response.statusCode).send(response);
  });
}

async function validateUser({ email, password }) {
  try {
    const user = await client.query('SELECT * FROM USERS WHERE EMAIL = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      return await errorResponse(401, 'Invalid email or password');
    }

    const saltedPassword = user.rows[0].password;
    const result = await bcrypt.compare(password, saltedPassword);

    if (result) {
      return await successResponse(200, 'Login Successful');
    } else {
      return await errorResponse(401, 'Invalid email or password');
    }
  } catch (error) {
    return await errorResponse(500, 'Failed to login', error);
  }
}

export default login;
