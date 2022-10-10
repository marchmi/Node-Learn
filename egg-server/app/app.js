module.exports = app => {
  app.once('server', server => {
    // websocket
    console.log(server, 'server');
  });
};
