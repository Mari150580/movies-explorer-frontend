export const BASE_URL = "https://filmoteca-back.nomoredomains.rocks";

//export const BASE_URL ="http://localhost:3000";
/*проверка res если ок то верни json если нет выведи ошибку*/
const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

/*авторизация*/
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({email, password }),
  }).then(getResponse);
};

/*регистрация*/

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(getResponse);
};

export const getContent = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then(getResponse);
};

