const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

const db = mongoose.connect('mongodb+srv://admin:44224422@datacluster.1j5iz.mongodb.net/CtcontrolDatabase?retryWrites=true&w=majority');
const ifaces = require('os').networkInterfaces();
const ClientData = require('./models/ClientData');
const SystemData = require('./models/SystemData');
const ClientDataRouter = require('./routes/ClientDataRouter')(ClientData);
const SystemDataRouter = require('./routes/SystemDataRouter')(SystemData);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.sendFile('./Views/StartView.html', { root: __dirname });
});
app.use('/clientdata', ClientDataRouter);
app.use('/systemdata', SystemDataRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong. Try again later';
    res.status(status).json({ message });
});

const localhost = Object.keys(ifaces).reduce((host, ifname) => {
  const iface = ifaces[ifname].find((iface) => !(iface.family !== 'IPv4' || iface.internal !== false));
  return iface ? iface.address : host;
}, '127.0.0.1');
const port = process.env.PORT || 8282;

app.listen(port, () => {
  console.log(`Server starting...\nip: ${localhost}\nport: ${port}`);
});