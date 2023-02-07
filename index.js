const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
    <img src="${movie.Poster}" />
    ${movie.Title} (${movie.Year})
    `;
  },
  inputValue (movie) {
    return movie.Title;
  },
  async fetchData (searchTerm) {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "d9835cc5",
        s: searchTerm,
      },
    });
    if (response.data.Error) {
      return [];
    }
    return response.data.Search;
  }
}

createAutoComplete ({
  ...autoCompleteConfig,
  root : document.querySelector ('#left-autocomplete'),
  onOptionSelect (movie) {
    document.querySelector ('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  }
});

createAutoComplete ({
  ...autoCompleteConfig,
  root : document.querySelector ('#right-autocomplete'),
  onOptionSelect (movie) {
    document.querySelector ('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  }
});
