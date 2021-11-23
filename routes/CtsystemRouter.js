/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const experss = require('express');

function routes(controlData) {
  const CtsystemRouter = experss.Router();
  CtsystemRouter.route('/pccontrol')
    .post((req, res) => {
      // eslint-disable-next-line new-cap
      const data = new controlData(req.body);
      data.save();
      res.sendStatus(201);
    })
    .get((req, res) => {
      const query = {};
      controlData.find(query, (err, pccontroldata) => {
        if (err) {
          return console.log(err);
        }
        return res.json(pccontroldata);
      });
    });
  CtsystemRouter.use('/pccontrol/update/:updateID', (req, res, next) => {
    const query = { IDdata: req.params.updateID };
    controlData.findOne(query, (err, pccontrol) => {
      if (err) {
        return console.log(err);
      }
      if (pccontrol) {
        req.pccontrol = pccontrol;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  CtsystemRouter.route('/pccontrol/update/:updateID')
    .get((req, res) => { res.json(req.pccontrol); })
    .put((req, res) => {
      const { pccontrol } = req;
      pccontrol.sleepContol = req.body.sleepContol;
      pccontrol.powerControl = req.body.powerControl;
      pccontrol.rebootControl = req.body.rebootControl;
      pccontrol.blockControl = req.body.blockControl;
      pccontrol.save();
      return res.json(pccontrol);
    });

  return CtsystemRouter;
}

module.exports = routes;
