import { commentsArr } from './commentsArr.js';
import { replyToComment, likeFunction } from './listeners.js';

export const renderComments = () => {
    const comments = document.querySelector('.comments');

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
            <button class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}" data-index="${index}"></button>
        </div>
        </div>
    </li>`;
        })
        .join('');

    comments.innerHTML = commentsHtml;

    likeFunction();
    replyToComment();
};
