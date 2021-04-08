const { ObjectId } = require("mongodb");
const url = require("url");

function get(req, res) {
    global.dbo.collection('session').findOne({ _id: ObjectId(req.params.id)}).then(document => {
        res.status(200).send(document);
    }).catch(err => {
        res.status(500).send(err);
    });
}

function listYearAndPreviousSessions(req, res) {
    const queryParams = url.parse(req.url, true).query;
    const year = +queryParams.year;

    global.dbo.collection('terms').find(
        { 
            $or: [
                { 
                    year: year, 
                },
                {   
                    year: year - 1
                }
            ] 
        },
        { projection: { sessions: true, termNumber: true }}
    ).toArray().then(document => {
        const sessions = document
            .map(({ _id, sessions, termNumber }) => sessions.map(s => ({ ...s, termNumber, termId: _id }))).flat();
        res.status(200).send(sessions);
    }).catch(err => {
        res.status(500).send(err);
    });
}

function create(req, res) {
    const _id = ObjectId();
    const sessionToCreate = { ...req.body, _id, personIds: [] };
    global.dbo.collection('terms').updateOne(
        { _id: ObjectId(req.params.termId) },
        { $addToSet: { sessions: sessionToCreate }}
    ).then(document => {
        res.status(200).send({ ...document, insertedId: _id });
    }).catch(err => {
        res.status(500).send(err);
    });
}

function checkIn(req, res) {
    global.dbo.collection('terms').updateOne(
        { _id: ObjectId(req.params.termId) },
        { $addToSet: { 'sessions.$[element].personIds': req.body.personId }},
        { arrayFilters: [{ "element._id": ObjectId(req.params.sessionId) }] }
    ).then(document => {
        res.status(200).send(document);
    }).catch(err => {
        res.status(500).send(err);
    });
}

function checkOut(req, res) {
    global.dbo.collection('terms').updateOne(
        { _id: ObjectId(req.params.termId) },
        { $pull: { 'sessions.$[element].personIds': req.body.personId }},
        { arrayFilters: [{ "element._id": ObjectId(req.params.sessionId) }] }
    ).then(document => {
        res.status(200).send(document);
    }).catch(err => {
        res.status(500).send(err);
    });
}

module.exports = {
    get,
    listYearAndPreviousSessions,
    create,
    checkIn,
    checkOut
}