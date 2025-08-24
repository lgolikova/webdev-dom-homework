import { commentsArr } from './commentsArr.js';
import { replyToComment, likeFunction } from './listeners.js';
import { renderLogin } from './renderLogin.js';
import {token, name, loadComments} from './api.js'

export const renderComments = () => {
    const container = document.querySelector('.container');

    const commentsHtml = commentsArr
        .map((comment, index) => {
            return `<li class="comment">
        <div class="comment-header">
        <div>${comment.userName}</div>
        <div>${comment.userDate}</div>
        </div>
        <div class="comment-body">
        <div class="comment-text">
            ${comment.userComment}
        </div>
        </div>
        <div class="comment-footer">
        <div class="likes">
            <span class="likes-counter">${comment.likesAmount}</span>
            <button class="${comment.isLiked ? 'like-button -active-like' : 'like-button'} ${comment.isLikeLoading ? '-loading-like' : ''}" data-index="${index}"></button>
        </div>
        </div>
    </li>`;
        })
        .join('');

    // container.innerHTML = commentsHtml;

    const addCommentsHtml = `
    <ul class="comments"></ul>
    <div class="add-form">
        <input
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
            readonly
            value = '${name}'
            id='name-input'
        >
        <textarea
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш комментарий"
            rows="4"
            id='text-input'
        ></textarea>
        <div class="add-form-row">
            <button type="button" class="add-form-button">
                Написать
            </button>
        </div>
    </div>`

    const linkToLoginText = `<p>Чтобы отправить комментарий, <span class='link-login'>войдите</span></p>`

    const baseHtml = `<ul class="comments">${commentsHtml}</ul>
    ${token ? addCommentsHtml : linkToLoginText}`;

    container.innerHTML = baseHtml;

    if(token) {
    likeFunction();
    replyToComment();
    loadComments();
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin();
        })
    }

};
