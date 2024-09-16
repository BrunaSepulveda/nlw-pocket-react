interface GoalsPerDayInfo {
  id: string;
  title: string;
  completedAt: Date;
}

interface Summary {
  completed: number;
  total: number;
  goalsPerDay: Record<
    string,
    GoalsPerDayInfo[]
  > | null;
}
[];

interface SummaryResponse {
  summary: Summary;
}

interface PendingGoal {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
}

interface GoalCompletion {
  id: string;
  createdAt: Date;
  goalId: string;
}

interface CreateGoalParams {
  title: string;
  desiredWeeklyFrequency: number;
}

interface Goal {
  desiredWeeklyFrequency: number;
  title: string;
  id: string;
  createdAt: Date;
}

export type {
  Summary,
  SummaryResponse,
  GoalsPerDayInfo,
  PendingGoal,
  GoalCompletion,
  CreateGoalParams,
  Goal,
};
