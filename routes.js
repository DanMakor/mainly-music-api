const express = require('express');
const router = express.Router();
const personService = require('./person.service');
const sessionService = require('./session.service');
const termService = require('./term.service');

// router.route('/families/create').post((req, res) => {
//     console.log("we made it in");
//     familyService.createFamily(req, res);
// });

router.route('/persons').get((req, res) => {
    personService.list(req, res);
});

router.route('/persons/:id').get((req, res) => {
    personService.get(req, res);
});

router.route('/persons/:id').put((req, res) => {
    personService.updatePerson(req, res);
});

router.route('/persons/:id/drink').put((req, res) => {
    personService.upsertDrink(req, res);
});

router.route('/persons/:id/hasBowl').put((req, res) => {
    personService.updateHasBowl(req, res);
});

router.route('/persons/createChild').post((req, res) => {
    personService.createChild(req, res);
});

router.route('/persons/createGuardian').post((req, res) => {
    personService.createGuardian(req, res);
});

router.route('/persons/createStaffMember').post((req, res) => {
    personService.createStaffMember(req, res);
});

router.route('/persons/createFamily').post((req, res) => {
    personService.createFamily(req, res);
});

router.route('/terms').get((req, res) => {
    termService.list(req, res);
});

router.route('/terms/:id').get((req, res) => {
    termService.get(req, res);
});

router.route('/terms/:id/register').post((req, res) => {
    termService.register(req, res);
});

router.route('/terms/:id/updateRegistration').post((req, res) => {
    termService.updateRegistration(req, res);
});

router.route('/terms/create').post((req, res) => {
    termService.create(req, res);
})

// router.route('/sessions/:id').get((req, res) => {
//     sessionService.get(req, res);
// });

router.route('/sessions').get((req, res) => {
    sessionService.listYearAndPreviousSessions(req, res);
});

router.route('/terms/:termId/sessions/create').post((req, res) => {
    sessionService.create(req, res);
});

router.route('/terms/:termId/sessions/:sessionId/checkIn').post((req, res) => {
    sessionService.checkIn(req, res);
});

router.route('/terms/:termId/sessions/:sessionId/checkOut').post((req, res) => {
    sessionService.checkOut(req, res);
});

// //Transactions
// router.route('/transactions').get((req, res) => {
//     transactionService.getTransactions(req, res);
// });

// router.route('/transactions/create').post((req, res) => {
//     transactionService.createTransaction(req, res);
// });

// router.route('/transactions/createmany').post((req, res) => {
//     transactionService.createManyTransactions(req, res);
// });

// router.route('/transactions/delete/:id').delete((req, res) => {
//     transactionService.deleteTransaction(req, res);
// });

// // Accounts
// router.route('/accounts/delete/:id').delete((req, res) => {
//     accountService.deleteAccount(req, res);    
// });

// router.route('/accounts/:id').get((req, res) => {
//     accountService.getAccountById(req, res);
// });

// router.route('/accounts/:id/update').post((req, res) => {
//     accountService.updateAccount(req, res);
// })

// router.route('/accounts').get((req, res) => {
//     accountService.getAccounts(req, res);
// });

// router.route('/accounts/create').post((req, res) => {
//     accountService.createAccount(req, res);
// });

module.exports=router;
