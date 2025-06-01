import bcrypt from 'bcrypt';

import client from '#db/client.js';
import successResponse from '#utility/Responses/successResponse.js';
import errorResponse from '#utility/Responses/errorResponse.js';

async function loginUser({ email, password }) {
  try {
    const user = await client.query('SELECT * FROM USERS WHERE EMAIL = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      return await errorResponse(401, 'Invalid Email or Password');
    }

    const saltedPassword = user.rows[0].password;
    const passwordMatched = await bcrypt.compare(password, saltedPassword);

    if (passwordMatched) {
      return await successResponse(200, 'Login Successful');
    } else {
      return await errorResponse(401, 'Invalid Email or Password');
    }
  } catch (error) {
    return await errorResponse(500, 'Failed to login', error);
  }
}

export default loginUser;
