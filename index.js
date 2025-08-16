import { loadComments } from './modules/api.js';
import { sendComment } from './modules/listeners.js';

loadComments();
sendComment();
