const configs = {
     url: "https://api.nomoreparties.co/beatfilm-movies",
     
      headers: {
        "content-type": "application/json",
      },
    };
    
    export class MoviesApi {
      #onResponse(response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject({
            message: `Ошибка отправки картинки на стороне сервера`,
            response,
          });
        }
      }
    
      constructor(configs) {
        this._url = configs.url;
        this._headers = configs.headers;
      }
    
      getToken(jwt) {
        this._headers.authorization = `Bearer ${jwt}`;
      }

     /*загрузка карточек с сервера*/
  getAllTasks() {
    return fetch(`${this._url}`, {
      method: "GET",
      headers: this._headers,
    }).then((response) => {
      return this.#onResponse(response);
    });
  }
    }
    
    const apiMovies = new MoviesApi(configs);
    
    export default apiMovies;
