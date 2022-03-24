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
            const clientdata = new ClientData(req.body);
            clientdata.save();
            res.sendStatus(201);
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
            const { clientdata } = req;
            clientdata.DateNumber = req.body.DateNumber;
            clientdata.DateMonth = req.body.DateMonth;
            clientdata.DateYear = req.body.DateYear;
            clientdata.Time = req.body.Time;
            clientdata.Day = req.body.Day;
            clientdata.WorktimeDay = req.body.WorktimeDay;
            clientdata.WorktimeHour = req.body.WorktimeHour;
            clientdata.WorktimeMinut = req.body.WorktimeMinut;
            clientdata.WorktimeSecond = req.body.WorktimeSecond;
            clientdata.Batary = req.body.Batary;
            clientdata.CpuTemperature = req.body.CpuTemperature;
            clientdata.GpuTemperature = req.body.GpuTemperature;
            clientdata.save();
            return res.status(200).json(clientdata);
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