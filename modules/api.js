import { setCommentsArr } from './commentsArr.js';
import { renderComments } from './renderComments.js';

const user_key = 'lgolikova';
const api_url = `https://wedev-api.sky.pro/api/v1/${user_key}/comments`;

export const loadComments = () => {
    return fetch(api_url)
        .then((result) => result.json())
        .then((data) => {
            const apiComments = data.comments.map((comment) => ({
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
        })
        .catch((error) => console.error('Ошибка загрузки:', error));
};

export const postComment = (name, text) => {
    return fetch(api_url, {
        method: 'POST',
        body: JSON.stringify({ name, text }),
    }).then((result) => {
        if (result.status === 400) {
            return result.json().then((err) => {
                alert(err.error);
                throw new Error(err.error);
            });
        }
        if (!result.ok) throw new Error('Ошибка при отправке');
        return result.json();
    });
};
