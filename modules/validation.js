export function validateComment(text) {
    text = text.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    return text;
}