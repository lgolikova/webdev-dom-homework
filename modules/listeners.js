import { commentsArr } from './commentsArr.js';
import { renderComments } from './renderComments.js';
import { validateComment } from './validation.js';
import { postComment, loadComments } from './api.js';

const comment = document.querySelector('.add-form-text');

//Обработка лайков
function likeFunction() {
    const likeBtns = document.querySelectorAll('.like-button');
    for (const likeBtn of likeBtns) {
        likeBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = likeBtn.dataset.index;
            const comment = commentsArr[index];

            if (comment.isLiked) {
                comment.likesAmount--;
            } else {
                comment.likesAmount++;
            }
            comment.isLiked = !comment.isLiked;

            renderComments();
        });
    }
}

//Цитирование (клик на комментарий)
function replyToComment() {
    const anotherComments = document.querySelectorAll('.comment');

    anotherComments.forEach((anotherComment, index) => {
        anotherComment.addEventListener('click', () => {
            const currentCommentIndex = index;
            const quoteMessage = commentsArr[currentCommentIndex].userComment;
            const quoteUserName = commentsArr[currentCommentIndex].userName;
            const quoteDate = commentsArr[currentCommentIndex].userDate;

            comment.value = `<<< ${quoteUserName} писал(а) ${quoteDate}:\n "${quoteMessage}"<<< `;
        });
    });
}

// Отправка комментария
function sendComment() {
    const formName = document.querySelector('.add-form-name');
    const btn = document.querySelector('.add-form-button');
    const form = document.querySelector('.add-form');

    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Не указано имя или текст комментария';
    errorMessage.style.color = 'red';

    btn.addEventListener('click', () => {
        if (!formName.value || !comment.value) {
            if (!form.contains(errorMessage)) {
                form.appendChild(errorMessage);
            }
            return;
        }
        const name = validateComment(formName);
        const text = validateComment(comment);

        const loadingMessage = document.createElement('h1');
        loadingMessage.textContent = 'Комментарий добавляется...';
        form.style.display = 'none';
        form.parentNode.insertBefore(loadingMessage, form);
        loadingMessage.style.marginTop = '30px';

        postComment(name, text)
            .then(() => loadComments())
            .then(() => {
                form.style.display = 'flex';
                loadingMessage.remove();
                formName.value = '';
                comment.value = '';
                if (form.contains(errorMessage)) {
                    form.removeChild(errorMessage);
                }
            })
            .catch((err) => console.error(err));
    });
}

export { likeFunction, replyToComment, sendComment };
