/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const experss = require('express');

function routes(Data) {
  const CtcontrolRouter = experss.Router();
  CtcontrolRouter.route('/pcdata')
    .post((req, res) => {
      const data = new Data(req.body);
      data.save();
      res.sendStatus(201);
    })
    .get((req, res) => {
      const query = {};
      Data.find(query, (err, pcdata) => {
        if (err) {
          return console.log(err);
        }
        return res.json(pcdata);
      });
    });
  CtcontrolRouter.use('/pcdata/update/:updateID', (req, res, next) => {
    const query = { IDdata: req.params.updateID };
    Data.findOne(query, (err, pcdata) => {
      if (err) {
        return console.log(err);
      }
      if (pcdata) {
        req.pcdata = pcdata;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  CtcontrolRouter.route('/pcdata/update/:updateID')
    .get((req, res) => { res.json(req.pcdata); })
    .put((req, res) => {
      const { pcdata } = req;
      pcdata.date = req.body.date;
      pcdata.time = req.body.time;
      pcdata.second = req.body.second;
      pcdata.day = req.body.day;
      pcdata.worktime = req.body.worktime;
      pcdata.batary = req.body.batary;
      pcdata.save();
      return res.json(pcdata);
    });

  return CtcontrolRouter;
}

module.exports = routes;
