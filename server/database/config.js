
const DB_NAME = process.env.DB_NAME;

const DB_URL = process.env.MONGODB_URI || `mongodb://localhost/${DB_NAME}`;

const MONGOOSE_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

module.exports = {
  DB_URL,
  MONGOOSE_OPTIONS,
};
