var app = require('../app');
var http = require('http');

var server = http.createServer(app);
server.listen(8000);

// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;


// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   cluster.on('online', (worker) => {
//     console.log(`worker with id:${worker.id} & pid:${worker.process.pid} is online`)
//   })

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
//   // Workers can share any TCP connection
//   // In this case it is an HTTP server

//   var server = http.createServer(app);
//   server.listen(8000);


//   console.log(`Worker ${process.pid} started`);
// }
