require("dotenv").config();

module.exports = {
  app: {
    port: process.env.SERVER_PORT || 3000,
    static_folder: `${__dirname}/../src/public`,
    router: `${__dirname}/../src/routers/web`,
    view_folder: `${__dirname}/../src/apps/views`,
    view_engine: "ejs",
    session_key: "Vietpro_session",
  },
};
