import View from './view';
import previewView from './previewView';
import icons from '../../img/icons.svg'; // Parcel 1

class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new BookmarkView();
