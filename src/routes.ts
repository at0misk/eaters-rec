import { Router, Request, Response } from "express";
import {
  eatersIndex,
  eatersByName,
  availableRestaraunts,
  restrictionsByEaterNames,
  createReservation
} from "./controllers";

const router = Router();

// Root Route
router.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

// Eaters
router.get("/eaters", async (req: Request, res: Response) => {
  eatersIndex(req, res);
});

router.get("/eaters-by-name", async (req: Request, res: Response) => {
  eatersByName(req, res);
});

router.get("/restrictions-by-name", async (req: Request, res: Response) => {
  restrictionsByEaterNames(req, res);
});

router.get("/available-restaurants", async (req: Request, res: Response) => {
  availableRestaraunts(req, res);
});

router.post("/reservations", async (req: Request, res: Response) => {
  createReservation(req, res);
});

export default router;