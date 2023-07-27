const configs = {
   url: "https://filmoteca-back.nomoredomains.rocks",
   //url: "http://localhost:3000",
     headers: {
       "content-type": "application/json",
     },
   };
   
   export class MainApi {
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
     
      /*загрузка профиля ссервера*/
      getAllProfile() {
       return fetch(`${this._url}/users/me`, {
         method: "GET",
         headers: this._headers,
       }).then((response) => {
       // console.log(response);
         return this.#onResponse(response);
       });
     }

     
     /*загрузка на сервер новых данных профиля*/
   
     addNewProfile(formItemObject) {
       return fetch(`${this._url}/users/me`, {
         method: "PATCH",
         headers: this._headers,
         body: JSON.stringify(formItemObject),
       }).then((response) => {
         return this.#onResponse(response);
       });
     }


    


   }
   
   const apiMain = new MainApi(configs);
   
   export default apiMain;