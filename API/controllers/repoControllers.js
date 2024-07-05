const axios = require('axios');
const Repo = require('../model/repoSchema')

const ConflictRequestError = require('../errors/ConflictRequestError');

let autoSyncTimer = null;
const minutes = 60;

async function createRepo(repo) {
  try {
    await Repo.create({
      id: repo.id,
      login: repo.owner.login,
      name: repo.name,
      avatar: repo.owner.avatar_url,
      ownerUrl: repo.owner.html_url,
      repoUrl: repo.html_url,
      description: repo.description,
      stargazers_count: repo.stargazers_count
    })    
  } catch(err) {
    if (err.code === 11000) {
      throw new ConflictRequestError('Такой репозиторий уже существует')
    } else throw err;
  }
}

async function getRepo(req, res, next) {
  try {
    const repositories = await Repo.find().sort({ stargazers_count: -1 });
    res.json(repositories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching repositories' });
  }
}

async function getAddedRepo(req, res, next) {
  console.log('я вообще сюда попал')
  const identifier = req.params.nameOrId;
  console.log(identifier)
  try { 
    const repository = await Repo.findOne({ $or: [{ id: identifier }, { name: identifier }, { login: identifier }] });
    console.log(repository)
    if (repository === null) {
      res.json({ message: 'No data found!' });
    } else {
      res.json(repository);
    }
  } catch(err) {
		res.status(500);
		res.json({ message: 'Error: ' + err.message });
  } 
}

async function startSync(req, res, next) {
  console.log('запускаюсь каждый час')
  try{
    const response = await axios.get('https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=5')
    const repositories = response.data.items;
    // console.log(response.data.items)
    for (const repo of repositories) {
      const addedRepo = await Repo.findOne({ id: repo.id })
      if (addedRepo) {
        console.log(addedRepo)
        addedRepo.stargazers_count = repo.stargazers_count;
        // existingRepo.last_synced = Date.now();
        await addedRepo.save();
      } else createRepo(repo)
    }
  } catch(err) {
    console.log(err)
  }
}

async function startTimer(req, res) {
  try {
    if (autoSyncTimer) {
      res.status(208);
      res.json({ message: 'Auto sync already started!' });
      res.end();
    } else {
      autoSyncTimer = setInterval(() => {
        startSync()
      }, minutes * 60 * 1000)
      startSync()
      res.json({ message: 'Auto sync started!' });
      res.end();
    }
  } catch (error) {
    console.log('Error: ' + error.message);
    res.status(500);
    res.end();
  }
}

async function stopTimer(req, res) {
  try {
    console.log('почитсились')
    if (autoSyncTimer) {
      console.log('и после очистки сюда')
      clearInterval(autoSyncTimer);
      autoSyncTimer = setInterval(() => {
        startSync()
      }, minutes * 60 * 1000)
      startSync()
      res.json({ message: 'Auto sync reset!' });
      res.end();
    } 
  } catch (error) {
    console.log('Error: ' + error.message);
    res.status(500);
    res.end();
  }
}

module.exports = {
  getRepo,
  getAddedRepo,
  startTimer,
  stopTimer
};