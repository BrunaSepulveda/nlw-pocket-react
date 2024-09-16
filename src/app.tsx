import { Dialog } from "./components/ui/dialog";
import { CreateGoal } from "./components/create-goals";

import { EmptyPage } from "./pages/empty.page";
import { useQueries } from "@tanstack/react-query";
import {
  getSummary,
  getWeekPendingGoals,
} from "./service";
import { SummaryPage } from "./pages/summary.page";

export function App() {
  const [
    { data },
    { data: pendingGoals },
  ] = useQueries({
    queries: [
      {
        queryKey: ["summary"],
        queryFn: getSummary,
        staleTime: 1000 * 60,
      },
      {
        queryKey: [
          "getWeekPendingGoals",
        ],
        queryFn: getWeekPendingGoals,
        staleTime: 1000 * 60,
      },
    ],
  });

  return (
    <Dialog>
      {data?.total &&
      data?.total > 0 ? (
        <SummaryPage
          data={data}
          pendingGoals={
            pendingGoals || []
          }
        />
      ) : (
        <EmptyPage />
      )}
      <CreateGoal />
    </Dialog>
  );
}
