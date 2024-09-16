import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { DialogTrigger } from "../components/ui/dialog";
import { InOrbitIcon } from "../components/in-orbit-icon";
import {
  Progress,
  ProgressIndicator,
} from "../components/ui/progress-bar";
import { Separator } from "../components/ui/separator";
import { OutlineButton } from "../components/ui/outline-button";
import UnorderedList from "../components/unordered-list";
import {
  PendingGoal,
  Summary,
} from "../types";
import ptBR from "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { createGoalCompletion } from "../service";
import { queryClient } from "../main";

dayjs.locale(ptBR);

type SummaryPageParams = {
  data: Summary;
  pendingGoals: PendingGoal[];
};

export function SummaryPage({
  data,
  pendingGoals,
}: SummaryPageParams) {
  const firstDay = dayjs()
    .startOf("week")
    .format("D MMMM");
  const lastDay = dayjs()
    .endOf("week")
    .format("D MMMM");

  const completedPercentage =
    Math.round(
      (data.completed * 100) /
        data.total
    );

  const completGoal = async (
    id: string
  ) => {
    await createGoalCompletion(id);
    queryClient.invalidateQueries({
      queryKey: ["summary"],
    });
    queryClient.invalidateQueries({
      queryKey: ["getWeekPendingGoals"],
    });
  };

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">
            {firstDay} - {lastDay}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator
            style={{
              width: `${completedPercentage}%`,
            }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou
            <span className="text-zinc-100">
              {` ${data.completed} `}
            </span>
            de
            <span className="text-zinc-100">
              {` ${data.total} `}
            </span>
            metas nessa semana.
          </span>
          <span>
            {completedPercentage}%
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        {pendingGoals.map(
          ({
            id,
            title,
            completionCount,
            desiredWeeklyFrequency,
          }) => (
            <OutlineButton
              disabled={
                completionCount >=
                desiredWeeklyFrequency
              }
              key={id}
              onClick={() =>
                completGoal(id)
              }
            >
              <Plus className="size-4 text-zinc-600" />
              {title}
            </OutlineButton>
          )
        )}
      </div>

      {data.goalsPerDay && (
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">
            Sua semana
          </h2>
          <UnorderedList
            goalsPerDay={
              data.goalsPerDay
            }
          />
        </div>
      )}
    </div>
  );
}
