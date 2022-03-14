const express = require('express');
function routes(SystemData) {
	const SystemDataRouter = express.Router();
	SystemDataRouter.route('/')
		.get((req, res) => {
			SystemData.find({}, (err, systemdata) => {
				if (err) {
					return res.sendStatus(404);
				}
				return res.status(200).json(systemdata);
			});
		})
        .post((req, res) => {
            if (typeof (req.body.Shutdown) === 'boolean' &&
                typeof (req.body.Reset) === 'boolean' &&
                typeof (req.body.Sleep) === 'boolean') {
                const systemdata = new SystemData(req.body);
			    systemdata.save();
			    res.sendStatus(201);
            } else {
                res.sendStatus(400);
            }
		});
    SystemDataRouter.use('/:id', (req, res, next) => {
        const query = { _id: req.params.id };
        SystemData.findOne(query, (err, systemdata) => {
            if (err) {
                return res.sendStatus(404);
            }
            if (systemdata) {
                req.systemdata = systemdata;
                return next();
            }
            return res.sendStatus(404);
        });
    });
    SystemDataRouter.route('/:id')
        .get((req, res) => {
            return res.json(req.systemdata);
        })
        .put((req, res) => {
            if (typeof (req.body.Shutdown) === 'boolean' &&
                typeof (req.body.Reset) === 'boolean' &&
                typeof (req.body.Sleep) === 'boolean') {
                const { systemdata } = req;
                systemdata.Shutdown = req.body.Shutdown;
                systemdata.Reset = req.body.Reset;
                systemdata.Sleep = req.body.Sleep;
                systemdata.save();
                return res.status(200).json(systemdata);
            } else {
                res.sendStatus(400);
            }
        });
    SystemDataRouter.route('/:id')
        .delete((req, res) => {
            const query = { _id: req.params.id };
            SystemData.findByIdAndDelete(query, (err, systemdata) => {
                if (err) {
                    return res.sendStatus(404);
                }
                return res.send(systemdata);
            });
        });
	return SystemDataRouter;
}
module.exports = routes;