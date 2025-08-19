import { setCommentsArr } from './commentsArr.js';
import { renderComments } from './renderComments.js';

const user_key = 'lgolikova';
const api_url = `https://wedev-api.sky.pro/api/v1/${user_key}/comments`;

export const loadComments = () => {
    const form = document.querySelector('.add-form');
    const comments = document.querySelector('.comments');

    // form.style.display = 'none';
    comments.innerHTML = '<h1>Данные загружаются...</h1>';

    return fetch(api_url)
        .then((result) => result.json())
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
        .catch((error) => console.error('Ошибка загрузки:', error));
};

export const postComment = (name, text) => {
    return fetch(api_url, {
        method: 'POST',
        body: JSON.stringify({ name, text }),
    }).then((result) => {
        if (result.status === 400) {
            return result
                .json()
                .then((err) => Promise.reject(new Error(err.error)));
        }
        if (!result.ok) {
            return Promise.reject(new Error('Ошибка при отправке'));
        }
        return result.json();
    });
};
