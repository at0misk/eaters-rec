"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("./db"));
const router = (0, express_1.Router)();
// This route handles requests to the root path '/'
router.get("/", (req, res) => {
    res.send("Welcome to the To-Do List App!");
});
// This route gets all tasks
router.get("/eaters", async (req, res) => {
    try {
        const result = await db_1.default.query("SELECT * FROM eater");
        const todos = result.rows;
        res.json(todos);
    }
    catch (error) {
        console.error("Error fetching todos", error);
        res.status(500).json({ error: "Error fetching todos" });
    }
});
exports.default = router;
