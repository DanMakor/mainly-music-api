const { ObjectId } = require("mongodb");

function get(req, res) {
    global.dbo.collection('terms').findOne({ _id: ObjectId(req.params.id)}).then(document => {
        res.status(200).send(document);
    }).catch(err => {
        res.status(500).send(err);
    });
}

function list(req, res) {
    global.dbo.collection('terms').find({}, { projection: { sessions: false }}).toArray().then(document => {
        res.status(200).send(document);
    }).catch(err => {
        res.status(500).send(err);
    });
}

function create(req, res) {
    const term = { ...req.body, registrations: [], sessions: [] };
    global.dbo.collection('terms').insertOne(term).then(document => {
        res.status(200).send(document);
    }).catch(err => {
        res.status(500).send(err);
    });
}

function register(req, res) {
    global.dbo.collection('terms').updateOne(
        { _id: ObjectId(req.params.id) },
        { $addToSet: { registrations: req.body }}
    ).then(document => {
        res.status(200).send(document);
    }).catch(err => {
        res.status(500).send(err);
    });
}

function updateRegistration(req, res) {
    global.dbo.collection('terms').updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: { 'registrations.$[element]': req.body }},
        { arrayFilters: [{ "element.familyId": req.body.familyId }]}
    ).then(document => {
        res.status(200).send(document);
    }).catch(err => {
        res.status(500).send(err);
    });
}

module.exports = {
    get,
    list,
    create,
    register,
    updateRegistration
}