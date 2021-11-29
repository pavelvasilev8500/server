const experss = require('express');
const mongoose = require('mongoose');

const app = experss();
const bodyParser = require('body-parser');

const db = mongoose.connect('mongodb+srv://admin:44224422@datacluster.1j5iz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const ifaces = require('os').networkInterfaces();
const Data = require('./models/dataModel');
const CtcontrolRouter = require('./routes/CtcontrolRouter')(Data);
const controlData = require('./models/controldataModel');
const { Console } = require('console');
const CtsystemRouter = require('./routes/CtsystemRouter')(controlData);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', CtcontrolRouter);
app.use('/api', CtsystemRouter);

const localhost = Object.keys(ifaces).reduce((host, ifname) => {
    const iface = ifaces[ifname].find((iface) => !(iface.family !== 'IPv4' || iface.internal !== false));
    return iface ? iface.address : host;
}, '127.0.0.1');

const port = 8282;

app.listen(port, () => {
    console.log(`Server starting...\nip: ${localhost}\nport: ${port}`);
});
