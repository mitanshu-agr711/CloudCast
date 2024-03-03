import { Router } from "express";
import {registration} from "../controller/user.controller.js"

const router=Router();

router.route("/register").post(registration)

export default router //default means import ke bakat man chsaha name desakte ho