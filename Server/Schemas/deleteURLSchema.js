const urlSchema = {
  params: {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 6 },
    },
    required: ['username'],
  },
  body: {
    type: 'object',
    properties: {
      shortURL: { type: 'string' },
    },
    required: ['shortURL'],
  },
};

export default urlSchema;
