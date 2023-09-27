import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';

import { MODAL_CLOSE_SEC } from '../js/config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

// if (module.hot) {
//   module.hot.accept();
// }
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderspinner();

    // update result view to mark selected result
    resultView.update(model.getSearchResultsPage());
    // Loading recipes
    await model.loadRecipe(id);

    // Rendering recipes

    recipeView.render(model.state.recipe);

    // Updating bookmark view
    bookmarkView.update(model.state.bookmarks);
  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultView.renderspinner();
    // Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // Load Search
    await model.loadSearchResults(query);

    // console.log(model.state.search.results);
    // Render Results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage(1));

    // Render the initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const controlPagination = function (goToPage) {
  // Render New Results
  // resultView.render(model.state.search.results);
  resultView.render(model.getSearchResultsPage(goToPage));

  // Render the initial pagination
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  // Update the recipe servings (in State)
  model.updateServings(newServings);
  // Update the recipe View
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  // Update recipe vierw
  recipeView.update(model.state.recipe);

  // Render bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderspinner();
    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //  Render Recipe
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderMessage();

    // Render book,ark
    bookmarkView.render(model.state.bookmarks);

    // Change id in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log('😓😓', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addaHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

const newfeature = function () {
  console.log('new feature');
};
