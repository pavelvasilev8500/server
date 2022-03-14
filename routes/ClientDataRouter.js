const express = require('express');
function routes(ClientData) {
    const ClientDataRouter = express.Router();
    ClientDataRouter.route('/')
        .get((req, res) => {
            const query = {};
            ClientData.find(query, (err, clientdata) => {
                if (err) {
                    return res.sendStatus(404);
                }
                return res.status(200).json(clientdata);
            });
        })
        .post((req, res) => {
            if (typeof (req.body.Date) === 'string' &&
                typeof (req.body.Time) === 'string' &&
                typeof (req.body.Day) === 'string' &&
                typeof (req.body.Worktime) === 'string' &&
                typeof (req.body.Batary) === 'string' &&
                typeof (req.body.CpuTemperature) === 'string' &&
                typeof (req.body.GpuTemperature) === 'string') {
                const clientdata = new ClientData(req.body);
                clientdata.save();
                res.sendStatus(201);
            } else {
                res.sendStatus(400);
            }
        });
    ClientDataRouter.use('/:id', (req, res, next) => {
        const query = { _id: req.params.id };
        ClientData.findOne(query, (err, clientdata) => {
            if (err) {
                return res.sendStatus(404);
            }
            if (clientdata) {
                req.clientdata = clientdata;
                return next();
            }
            return res.sendStatus(404);
        });
    });
    ClientDataRouter.route('/:id')
        .get((req, res) => {
            return res.json(req.clientdata);
        })
        .put((req, res) => {
            if (typeof (req.body.Date) === 'string' &&
                typeof (req.body.Time) === 'string' &&
                typeof (req.body.Day) === 'string' &&
                typeof (req.body.Worktime) === 'string' &&
                typeof (req.body.Batary) === 'string' &&
                typeof (req.body.CpuTemperature) === 'string' &&
                typeof (req.body.GpuTemperature) === 'string') {
                const { clientdata } = req;
                clientdata.Date = req.body.Date;
                clientdata.Time = req.body.Time;
                clientdata.Day = req.body.Day;
                clientdata.Worktime = req.body.Worktime;
                clientdata.Batary = req.body.Batary;
                clientdata.CpuTemperature = req.body.CpuTemperature;
                clientdata.GpuTemperature = req.body.GpuTemperature;
                clientdata.save();
                return res.status(200).json(clientdata);
            } else {
                res.sendStatus(400);
            }
        });
    ClientDataRouter.route('/:id')
        .delete((req, res) => {
            const query = { _id: req.params.id };
            ClientData.findByIdAndDelete(query, (err, clientdata) => {
                if (err) {
                    return res.sendStatus(404);
                }
                return res.send(clientdata);
            });
        });
    return ClientDataRouter;
}
module.exports = routes;