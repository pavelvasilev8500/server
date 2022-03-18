const express = require('express');
const mongoose = require('mongoose');

const app = express();
const config = require('./Configuration/ServerConfiguration');
const bodyParser = require('body-parser');

const db = mongoose.connect(config.uri);
const ifaces = require('os').networkInterfaces();
const ClientData = require('./Models/ClientData');
const SystemData = require('./Models/SystemData');
const StatusData = require('./Models/StatusModel');
const ClientDataRouter = require('./Routes/ClientDataRouter')(ClientData);
const SystemDataRouter = require('./Routes/SystemDataRouter')(SystemData);
const StatusDataRouter = require('./Routes/StatusDataRouter')(StatusData);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.sendFile('./Views/StartView.html', { root: __dirname });
});
app.use('/clientdata', ClientDataRouter);
app.use('/systemdata', SystemDataRouter);
app.use('/statusdata', StatusDataRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong. Try again later';
    res.status(status).json({ message });
});

const localhost = Object.keys(ifaces).reduce((host, ifname) => {
  const iface = ifaces[ifname].find((iface) => !(iface.family !== 'IPv4' || iface.internal !== false));
  return iface ? iface.address : host;
}, '127.0.0.1');
const port = config.port;

app.listen(port, () => {
    console.log(`Server starting...\nip: ${localhost}\nport: ${port}`);
});