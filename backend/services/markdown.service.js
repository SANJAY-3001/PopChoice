import { marked } from "marked"
import DOMPurify  from "dompurify"
import  { JSDOM } from "jsdom"


const window = new JSDOM("").window
const purify = DOMPurify(window)

export default function markDownToSafeHtml(markDown) {
    const html = marked.parse(markDown)

    const safetHtml = purify.sanitize(html)

    return safetHtml
}