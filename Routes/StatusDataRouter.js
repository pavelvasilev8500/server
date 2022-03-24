const express = require('express');
function routes(StatusData) {
    const StatusDataRouter = express.Router();
    StatusDataRouter.route('/')
        .get((req, res) => {
            StatusData.find({}, (err, statusdata) => {
                if (err) {
                    return res.sendStatus(404);
                }
                return res.status(200).json(statusdata);
            });
        })
        .post((req, res) => {
            const statusdata = new StatusData(req.body);
            statusdata.save();
            res.sendStatus(201);
        });
    StatusDataRouter.use('/:id', (req, res, next) => {
        const query = { _id: req.params.id };
        StatusData.findOne(query, (err, statusdata) => {
            if (err) {
                return res.sendStatus(404);
            }
            if (statusdata) {
                req.statusdata = statusdata;
                return next();
            }
            return res.sendStatus(404);
        });
    });
    StatusDataRouter.route('/:id')
        .get((req, res) => {
            return res.json(req.statusdata);
        })
        .put((req, res) => {
            const { statusdata } = req;
            statusdata.Status = req.body.Status;
            statusdata.save();
            return res.status(200).json(statusdata);
        });
    StatusDataRouter.route('/:id')
        .delete((req, res) => {
            const query = { _id: req.params.id };
            StatusData  .findByIdAndDelete(query, (err, statusdata) => {
                if (err) {
                    return res.sendStatus(404);
                }
                return res.send(statusdata);
            });
        });
    return StatusDataRouter;
}
module.exports = routes;