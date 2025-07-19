import client from '#db/client.js';

import successResponse from '#utility/Responses/successResponse.js';
import errorResponse from '#utility/Responses/errorResponse.js';

async function getShortURLS(app) {
  app.get('/:username', async (req, res) => {
    try {
      const { username } = req.params;

      const short_urls = await client.query(
        'SELECT * FROM URLS WHERE USERNAME = $1',
        [username]
      );

      res
        .code(200)
        .send(
          await successResponse(
            200,
            'Short URLS fetched successfully',
            short_urls.rows
          )
        );
    } catch (error) {
      return res
        .code(500)
        .send(await errorResponse(500, 'Internal Server Error', error));
    }
  });
}

export default getShortURLS;
