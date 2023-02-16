import { Router } from "express";

const router = Router();

let users = [];

router.get('/', (req, res) => {

    res.render("index", { });

})

export default router;