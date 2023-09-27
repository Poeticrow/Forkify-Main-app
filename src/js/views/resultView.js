import View from './view';
import previewView from './previewView';
import icons from '../../img/icons.svg'; // Parcel 1

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
