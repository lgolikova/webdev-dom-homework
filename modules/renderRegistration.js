import { registration, setName, setToken, loadComments } from "./api.js";
import { renderLogin } from "./renderLogin.js";
import { renderComments } from "./renderComments.js";


export const renderRegistration = () => {
    const container = document.querySelector('.container');

    const loginHtml = `
    <section class='add-form'>
        <h1>Форма регистрации</h1>
        <input type='text' class='add-form-name' placeholder='Введите ваше имя' id='name' required/>
        <input type='text' class='add-form-name' placeholder='Введите логин' id='login' required/>
        <input type='text' class='add-form-name' placeholder='Введите пароль' id='password' required/>
        <fieldset class='add-form-registry'>
            <button class='add-form-button-main' type='button'>Зарегистрироваться</button>
            <u class='add-form-button-like entry'>Войти</u>
        </fieldset>
    </section>
    `
    container.innerHTML = loginHtml;
    document.querySelector('.add-form').style.display = 'flex';
    document.querySelector('.add-form').style.alignItems = 'center'

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin();
    })

    const nameEl = document.querySelector('#name');
    const loginEl = document.querySelector('#login');
    const passwordEl = document.querySelector('#password');
    const submitBtn = document.querySelector('.add-form-button-main');

    submitBtn.addEventListener('click', () => {
        registration(nameEl.value, loginEl.value, passwordEl.value)
            .then((data) => {
                setToken(data.user.token);
                setName(data.user.name);
                renderComments();
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}