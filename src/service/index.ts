import axios from "axios";
import {
  CreateGoalParams,
  Goal,
  GoalCompletion,
  PendingGoal,
  Summary,
  SummaryResponse,
} from "../types";

const app = axios.create({
  baseURL: "http://localhost:3333/",
});

async function getSummary(): Promise<Summary> {
  const { data } = await app.get(
    "summary"
  );

  return (data as SummaryResponse)
    .summary;
}

async function getWeekPendingGoals(): Promise<
  PendingGoal[]
> {
  const { data } = await app.get(
    "goals/pending-goals"
  );

  return data.pendingGoals;
}

async function createGoalCompletion(
  goalId: string
): Promise<GoalCompletion> {
  const { data } = await app.post(
    "completions",
    {
      goalId,
    }
  );
  return data.goalCompletion;
}

async function createGoal({
  desiredWeeklyFrequency,
  title,
}: CreateGoalParams): Promise<Goal> {
  const { data } = await app.post(
    "goals",
    {
      desiredWeeklyFrequency,
      title,
    }
  );
  return data.goal;
}

async function deleteCompletedGoals(
  id: string
) {
  return app.delete("completions", {
    data: { id },
  });
}

export {
  getSummary,
  getWeekPendingGoals,
  createGoalCompletion,
  createGoal,
  deleteCompletedGoals,
};
