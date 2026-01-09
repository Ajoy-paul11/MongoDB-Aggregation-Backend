import { Router } from "express";
import {
    joinAuthorsWithBooks,
    authorsWithOneBook,
    classicAuthors,
    countBookPerAuthor,
    joinBooksWithAuthors
} from "../controllers/aggregation06.controller.js";


const router = Router();


router.route("/author-with-book").get(joinAuthorsWithBooks);
router.route("/one-book-author").get(authorsWithOneBook);
router.route("/classic-author").get(classicAuthors);
router.route("/book-per-author").get(countBookPerAuthor);
router.route("/book-with-author").get(joinBooksWithAuthors);

export default router;