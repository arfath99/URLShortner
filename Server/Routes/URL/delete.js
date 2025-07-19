import client from '#db/client.js';

import urlSchema from '#schemas/deleteURLSchema.js';

import successResponse from '#utility/Responses/successResponse.js';
import errorResponse from '#utility/Responses/errorResponse.js';

async function deleteShortURL(app) {
  app.delete('/:username', { schema: urlSchema }, async (req, res) => {
    try {
      const { username } = req.params;
      const { shortURL } = req.body;

      const result = await client.query(
        'DELETE FROM URLS WHERE USERNAME = $1 AND SHORT_URL = $2',
        [username, shortURL]
      );

      return res
        .code(200)
        .send(
          await successResponse(
            200,
            'Short URL was deleted successfully',
            result
          )
        );
    } catch (error) {
      return res
        .code(500)
        .send(await errorResponse(500, 'Internal Server Error', error));
    }
  });
}

export default deleteShortURL;
