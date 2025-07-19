const urlSchema = {
  body: {
    type: 'object',
    required: ['username', 'longURL'],
    properties: {
      username: { type: 'string', minLength: 6 },
      longURL: { type: 'string', format: 'uri' },
    },
  },
};

export default urlSchema;
