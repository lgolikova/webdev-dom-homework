import { login, setName, setToken } from "./api.js";
import { renderRegistration } from "./renderRegistration.js";

export const renderLogin = () => {
    const container = document.querySelector('.container');

    const loginHtml = `
    <section class='add-form'>
        <h1>Форма входа</h1>
        <input type='text' class='add-form-name' placeholder='Введите логин' id='login' required/>
        <input type='text' class='add-form-name' placeholder='Введите пароль' id='password' required/>
        <fieldset class='add-form-registry'>
            <button class='add-form-button-main' type='submit'>Войти</button>
            <u class='add-form-button-like registry>Зарегистрироваться</u>
        </fieldset>
    <section>
    `
    container.innerHTML = loginHtml;

    document.querySelector('.registry').addEventListener('click', () => {
        renderRegistration();
    })

    const loginEl = document.querySelector('#login');
    const passwordEl = document.querySelector('#password');
    const submitBtn = document.querySelector('.add-form-button-main');

    submitBtn.addEventListener('click', () => {
        // login(loginEl.value, passwordEl.value).then(() => {
        //     (response) => response.json()
        // }).then((data) => {
        //     setToken(data.user.token);
        //     setName(data.user.name);
        // })
        login(loginEl.value, passwordEl.value).then((data) => {
            setToken(data.user.token);
            setName(data.user.name);
        });
    })

}