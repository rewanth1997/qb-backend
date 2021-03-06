module.exports = {
  NOT_AUTHORIZED: {
    code: 401,
    message: 'Not authorized'
  },
  ALREADY_SUBMITTED: {
    code: 200,
    message: 'Answer already submitted'  
  },
  INCORRECT_ANSWER: {
    code: 1000,
    message: 'Incorrect answer'
  },
  INVALID_TOKEN: {
    code: 401,
    message: 'Invalid token'
  },
  INVALID_CREDENTIALS: {
    code: 401,
    message: 'Invalid credentials'
  },
  SUCCESS: {
    code: 200,
    message: 'SUCCESS'
  },
  FORBIDDEN: {
    code: 403,
    message: 'Forbidden'
  },
  SERVER_ERROR: {
    code: 500,
    message: 'Internal Server Error'
  },
  BAD_INPUT: {
    code: 400,
    message: 'BAD INPUT'
  }
};
