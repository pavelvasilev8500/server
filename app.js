const experss = require('express');
const mongoose = require('mongoose');
const app = experss();
const db = mongoose.connect('mongodb://localhost:27017/dataAPI');
const CtcontrolRouter = experss.Router();
const Data = require('./models/dataModel');


CtcontrolRouter.route('/books')
  .get((req, res) => {
    Data.find((err, pcdata) => {
      if(err){
        return res.send(err);
      }else{
        console.log(pcdata);
        return res.json(pcdata);
      }
    });
  });
app.use('/api', CtcontrolRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const ifaces = require('os').networkInterfaces();

const localhost = Object.keys(ifaces).reduce((host, ifname) => {
  const iface = ifaces[ifname].find((iface) => !(iface.family !== 'IPv4' || iface.internal !== false));
  return iface ? iface.address : host;
}, '127.0.0.1');
const port = process.env.PORT || 4242;

app.listen(port, () => {
  console.log(`Server starting...\nip: ${localhost}\nport: ${port}`);
});
