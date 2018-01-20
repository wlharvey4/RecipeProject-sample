const express = require('express');

const recipesRouter = express.Router();

const db = require('../configuration/db.js');

const repository = require('./recipesRepository');

recipesRouter.get('/', (req, res) => {
  // /api/recipes/

  db('recipes')
    .then(records => {
      res.status(200).json(records);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not retrieve any recipes' });
    });
});

recipesRouter.get('/:id', (req, res) => {
  // /api/recipes/:id
  const { id } = req.params;

  repository
    .get(id)
    .then(record => {
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json(null);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not retrieve the recipe' });
    });
});

recipesRouter.get('/author/:username', (req, res) => {
  // /api/recipes/author/:username
  const { username } = req.params;

  db('recipes as r')
    .join('users as u', 'r.authorId', '=', 'u.id')
    .where('u.username', username)
    .select('r.*')
    // .groupBy(username)
    .then(records => {
      res.status(200).json(records);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Could not retrieve any recipes by that user' });
    });
});

recipesRouter.post('/madeIt', (req, res) => {
  const { recipeId } = req.body;

  db('recipes')
    .where('id', recipeId)
    .increment('madeIt')
    .then(() => res.status(200));
});

recipesRouter.post('/madeItCancel', (req, res) => {
  const { recipeId } = req.body;

  db('recipes')
    .where('id', recipeId)
    .decrement('madeIt')
    .then(() => res.status(200));
});

recipesRouter.put('/:id/updateRecipe', (req, res) => {
  const { name, keywords, ingredients, instructions } = req.body;
  const { id } = req.params;

  db('recipes')
    .where('id', id)
    .update({
      name: name,
      updatedAt: new Date(
        year,
        month,
        day,
        hours,
        minutes,
        seconds,
        milliseconds
      ),
      keywords: keywords,
      ingredients: ingredients,
      instructions: instructions
    })
    .then(records => {
      res.status(200).json(records);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not update that recipe' });
    });
});

recipesRouter.delete('/deleteRecipe', (req, res) => {
  const { recipeId } = req.body;

  db('recipes')
    .where('id', recipeId)
    .del()
    .then(records => {
      res.status(200).json(records);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not delete that recipe' });
    });
});

module.exports = recipesRouter;
