import bcrypt from 'bcrypt';
import zxcvbn from 'zxcvbn';

import client from '#db/client.js';

import registerSchema from '#schemas/registerUserSchema.js';

import successResponse from '#utility/Responses/successResponse.js';
import errorResponse from '#utility/Responses/errorResponse.js';

async function register(app, options) {
  app.post('/register', { schema: registerSchema }, async (req, res) => {
    let response = await createUser(req.body);
    app.log[response.success ? 'info' : 'error'](response.message);
    res.code(response.statusCode).send(response);
  });
}

async function createUser({ username, email, password }) {
  try {
    const user = await client.query('SELECT ID FROM USERS WHERE EMAIL = $1', [
      email,
    ]);

    if (user.rows.length) {
      return errorResponse(409, 'User already exists');
    }

    const passwordStrength = zxcvbn(password);

    if (passwordStrength.score <= 2) {
      return errorResponse(400, 'Weak Password');
    }

    const saltedPassword = await bcrypt.hash(password, 10);
    await client.query(
      'INSERT INTO USERS(USERNAME, EMAIL, PASSWORD) VALUES ($1, $2, $3)',
      [username, email, saltedPassword]
    );

    return successResponse(201, 'User Created Successfully');
  } catch (error) {
    return errorResponse(500, 'Failed to create user', error);
  }
}

export default register;

/**
 * Handler Name
 */
