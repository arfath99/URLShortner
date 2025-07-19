import crypto from 'crypto';
import client from '#db/client.js';

import urlSchema from '#schemas/createURLSchema.js';

import errorResponse from '#utility/Responses/errorResponse.js';
import successResponse from '#utility/Responses/successResponse.js';

async function shorten(app) {
  app.post('/', { schema: urlSchema }, async (req, res) => {
    try {
      const { username, longURL } = req.body;
      const normalizedLongURL = await normalizeURL(longURL);
      app.log.info(normalizedLongURL);

      const urls = await client.query(
        'SELECT * FROM URLS WHERE LONG_URL = $1',
        [normalizedLongURL]
      );

      app.log.info(urls);

      if (urls.rows.length) {
        return res
          .code(200)
          .send(
            await successResponse(
              200,
              'Shortened URL Already Exists',
              urls.rows[0].short_url
            )
          );
      }

      const shortID = crypto
        .createHash('sha256')
        .update(normalizedLongURL)
        .digest('base64url')
        .slice(0, 8);

      const shortURL = `${req.protocol}://${req.hostname}/${shortID}`;
      app.log.info(`The Short URL for Long URL ${longURL} is ${shortURL}`);

      await client.query(
        'INSERT INTO URLS(USERNAME, SHORT_URL, LONG_URL) VALUES($1, $2, $3)',
        [username, shortURL, normalizedLongURL]
      );

      return res
        .code(201)
        .send(await successResponse(201, 'URL Shortened', shortURL));
    } catch (err) {
      return res
        .code(500)
        .send(await errorResponse(500, 'Error Creating Short URL', err));
    }
  });
}

async function normalizeURL(url) {
  return url.trim().replace(/\/+$/, '').toLowerCase();
}

export default shorten;
