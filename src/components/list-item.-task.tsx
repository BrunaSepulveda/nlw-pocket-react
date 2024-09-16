import dayjs from "dayjs";
import { CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { deleteCompletedGoals } from "../service";
import { queryClient } from "../main";

interface ListItemTaskParams {
  id: string;
  goalName: string;
  goalCompletedTime: Date;
}

export default function ListItemTask({
  id,
  goalCompletedTime,
  goalName,
}: ListItemTaskParams) {
  const deleteCompleted = async (
    id: string
  ) => {
    await deleteCompletedGoals(id);
    queryClient.invalidateQueries({
      queryKey: ["summary"],
    });
    queryClient.invalidateQueries({
      queryKey: ["getWeekPendingGoals"],
    });
  };

  return (
    <li className="flex flex-row items-center gap-2">
      <CheckCircle2 className="size-4 text-pink-500" />
      <span className="text-sm text-zinc-400">
        Você completou "
        <span className="text-zinc-100">
          {goalName}
        </span>
        " às
        <span className="text-zinc-100">
          {dayjs(
            goalCompletedTime
          ).format("HH:mm")}
          h
        </span>
      </span>
      <Button
        variant="underlined"
        size="xs"
        onClick={() =>
          deleteCompleted(id)
        }
      >
        Desfazer
      </Button>
    </li>
  );
}
