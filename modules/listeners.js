//Обработка лайков
import { commentsArr } from "./commentsArr.js";
import { renderComments } from "./renderComments.js";
import { validateComment } from "./validation.js";
const comment = document.querySelector(".add-form-text");


function likeFunction() {
    const likeBtns = document.querySelectorAll(".like-button");
    for (const likeBtn of likeBtns) {
    likeBtn.addEventListener("click", (event) => {
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
    })
    }
}


//Цитирование (клик на комментарий)
function replyToComment() {
    const anotherComments = document.querySelectorAll(".comment");

    anotherComments.forEach((anotherComment, index) => {
    anotherComment.addEventListener("click", () => {
        const currentCommentIndex = index;
        const quoteMessage = commentsArr[currentCommentIndex].userComment;
        const quoteUserName = commentsArr[currentCommentIndex].userName;
        const quoteDate = commentsArr[currentCommentIndex].userDate;

        comment.value = `<<< ${quoteUserName} писал(а) ${quoteDate}:\n "${quoteMessage}"<<< `;

    })
    })
}


// Добавление комментария (через форму)
function sendComment() {
    const formName = document.querySelector(".add-form-name");
    const btn = document.querySelector(".add-form-button");
    const form = document.querySelector(".add-form");

    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Не указано имя или текст комментария';
    errorMessage.style.color = 'red';

    btn.addEventListener('click', () => {
    const date = new Date();
    const timeOptions = {
    hour: '2-digit',
    minute: '2-digit'
    };
    const dateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
    };

    const userDate = `${date.toLocaleDateString('ru-RU', dateOptions)} ${date.toLocaleTimeString('ru-RU', timeOptions)}`;

    if (formName.value === '' || comment.value === '') {
        if (!form.contains(errorMessage)) {
            form.appendChild(errorMessage);
        }
    } else {

    const newComment = { userName: validateComment(formName), userComment: validateComment(comment), userDate: userDate, likesAmount: 0, isLiked: false };
    commentsArr.push(newComment);

    formName.value = '';
    comment.value = '';

    if (form.contains(errorMessage)) {
        form.removeChild(errorMessage);
    }

    renderComments();

    }
})
}

export { likeFunction, replyToComment, sendComment }