import { X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui/radio-group";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { z } from "zod";
import {
  Controller,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { queryClient } from "../main";
import { CreateGoalParams } from "../types";
import { createGoal } from "../service";
import { createId } from "@paralleldrive/cuid2";

const createGoalSchema = z.object({
  title: z
    .string()
    .min(
      1,
      "Informe a atividade que deseja praticar"
    ),
  desiredWeeklyFrequency: z.coerce
    .number()
    .min(1)
    .max(7),
});

type CreateGoalSchema = z.infer<
  typeof createGoalSchema
>;

export function CreateGoal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CreateGoalSchema>({
    resolver: zodResolver(
      createGoalSchema
    ),
  });

  async function handleCreateGoal({
    title,
    desiredWeeklyFrequency,
  }: CreateGoalParams) {
    try {
      await createGoal({
        title,
        desiredWeeklyFrequency,
      });

      reset();

      queryClient.invalidateQueries({
        queryKey: ["pending-goals"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      toast.success(
        "Meta criada com sucesso!"
      );
    } catch {
      toast.error(
        "Erro ao criar a meta, tente novamente!"
      );
    }
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>
              Cadastrar meta
            </DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te
            fazem bem e que você quer
            continuar praticando toda
            semana.
          </DialogDescription>
        </div>
        <form
          onSubmit={handleSubmit(
            handleCreateGoal
          )}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">
                Qual a atividade?
              </Label>

              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register("title")}
              />

              {errors.title && (
                <p className="text-sm text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="desiredWeeklyFrequency">
                Quantas vezes na semana?
              </Label>

              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={2}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      value={String(
                        field.value
                      )}
                      onValueChange={
                        field.onChange
                      }
                    >
                      {[
                        "🙂",
                        "😎",
                        "😜",
                        "🤨",
                        "🤯",
                        "🔥",
                      ].map(
                        (value, i) => {
                          const frequency =
                            String(
                              i + 1
                            );

                          const keyId =
                            createId();

                          return (
                            <RadioGroupItem
                              key={
                                keyId
                              }
                              value={
                                frequency
                              }
                            >
                              <RadioGroupIndicator />
                              <span className="text-zinc-300 text-sm font-medium leading-none">
                                {
                                  frequency
                                }
                                x na
                                semana
                              </span>
                              <span className="text-lg leading-none">
                                {value}
                              </span>
                            </RadioGroupItem>
                          );
                        }
                      )}
                    </RadioGroup>
                  );
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-auto">
            <DialogClose asChild>
              <Button
                variant="secondary"
                className="flex-1"
              >
                Fechar
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="submit"
                className="flex-1"
              >
                Salvar
              </Button>
            </DialogClose>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
