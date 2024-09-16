import { Plus } from "lucide-react";

import logo from "../../public/logo.svg";
import rocketLaunchIllustration from "../../public/illustration_lets-start.svg";
import { Button } from "../components/ui/button";
import { DialogTrigger } from "../components/ui/dialog";

export function EmptyPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />

      <img
        src={rocketLaunchIllustration}
        alt="Ilustração de uma mulher controlando um lançamento de um foguete através de um controle remoto"
      />

      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma
        meta, que tal cadastrar uma
        agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  );
}
