import { setCommentsArr } from './commentsArr.js';
import { renderComments } from './renderComments.js';

const user_key = 'lgolikova';
const api_url = `https://wedev-api.sky.pro/api/v2/${user_key}/comments`;
const auth_url = 'https://wedev-api.sky.pro/api/user';

export let token = '';
export const setToken = (newToken) => {
    token = newToken;
}

export let name = '';
export const setName = (newNAme) => {
    name = newName;
}

export const loadComments = () => {
    const form = document.querySelector('.add-form');
    const comments = document.querySelector('.comments');

    // comments.innerHTML = '<h1>Данные загружаются...</h1>';

    return fetch(api_url)
        .then((result) => {
            if (result.status === 500) {
                throw new Error('Сервер сломался, попробуйте позже');
            }
            return result.json()
        })
        .then((data) => {
            const apiComments = data.comments.map((comment) => ({
                id: comment.id,
                userName: comment.author.name,
                userComment: comment.text,
                userDate: new Date(comment.date).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                likesAmount: comment.likes,
                isLiked: comment.isLiked,
            }));
            setCommentsArr(apiComments);
            renderComments();
            form.style.display = 'flex';
        })
        .catch((error) =>  {
            if (error.message === 'Failed to fetch') {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
            } else {
            alert(error.message);
            }
        });
};

export const postComment = (name, text) => {
    return fetch(api_url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text, forceError: true, }),
    })
    .then((result) => {
        if (result.status === 500) {
            throw new Error('Сервер сломался, попробуйте позже');
        }
        if (result.status === 400) {
            throw new Error('Неверные данные для комментария');
        }
        if (!result.ok) {
            throw new Error('Ошибка при отправке комментария');
        }
        return result.json();
    });
    // .then((data) => {
    //     return data;
    // })
    // .catch((error) => {
    //     alert(error.message);
    // });
};


export const login = (login, password) => {
    return fetch(auth_url + '/login', {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password})
    }).then(response => response.json());
}

export const registration = (name, login, password) => {
    return fetch(auth_url, {
        method: 'POST',
        body: JSON.stringify({ name: name, login: login, password: password})
    }).then(response => response.json());
}

