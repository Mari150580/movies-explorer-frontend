const configs = {
    url: "https://api.nomoreparties.co/beatfilm-movies",
    img_url: "https://api.nomoreparties.co/",
    local_url: "https://filmoteca-back.nomoredomains.rocks",
    headers: {
        "content-type": "application/json",
    },
    APIheaders: {
        "content-type": "application/json",
    },
};

export class MoviesApi {
    #onResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject({
                message: `Ошибка отправки запроса на фильмы`,
                response,
            });
        }
    }

    constructor(configs) {
        this._url = configs.url;
        this._APIurl = configs.local_url;
        this._IMGurl = configs.img_url;
        this._headers = configs.headers;
        this._APIheaders = configs.APIheaders;
    }

    /*загрузка фильмов с фильмотеки*/
    getAllMovies() {
        return fetch(`${this._url}`, {
            method: "GET",
            headers: this._headers,
        }).then((response) => {
            return this.#onResponse(response);
        });
    }

    getToken(jwt) {
        this._APIheaders.Authorization = `Bearer ${jwt}`;
    }

    /*загрузка фильмов с сервера*/
    getSavedMovies() {
        return fetch(`${this._APIurl}/movies/`, {
            method: "GET",
            headers: {...this._APIheaders, Accept: "application/json"},
        }).then((response) => {
            return this.#onResponse(response);
        });
    }

    /*загрузка на сервер новых данных о фильме*/
    addSavedMovie( movieId) {
        return fetch(`${this._APIurl}/movies/`, {
            method: "POST",
            headers: this._APIheaders,
            body: JSON.stringify(movieId),
        }).then((response) => {
            return this.#onResponse(response);
        });
    }


    /*загрузка на сервер новых данных о фильме*/
    deleteSavedMovie(movieId) {
        return fetch(`${this._APIurl}/movies/` + movieId, {
            method: "DELETE",
            headers: this._APIheaders,
        }).then((response) => {
            return this.#onResponse(response);
        });
    }


}

const apiMovies = new MoviesApi(configs);

export default apiMovies;