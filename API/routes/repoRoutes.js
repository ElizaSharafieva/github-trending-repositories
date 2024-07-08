const router = require('express').Router()
const {
  getRepo,
  getAddedRepo,
  startTimer,
  stopTimer,
  getNextSyncTime
} = require('../controllers/repoControllers')

router.get('/repositories', getRepo);

router.get('/repositories/:nameOrId', getAddedRepo);

router.get('/sync/start', startTimer);

router.get('/sync/force', stopTimer);

router.get('/sync/next', getNextSyncTime);

module.exports = router;