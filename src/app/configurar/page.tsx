import { StageEditor } from "@/components/config/StageEditor";
import { CsvImport } from "@/components/config/CsvImport";

export const dynamic = "force-dynamic";

export default function ConfigurarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Personalizar</h1>
        <p className="text-muted-foreground">
          Edita las etapas de tu pipeline e importa contactos — todo desde aquí.
        </p>
      </div>
      <StageEditor />
      <CsvImport />
    </div>
  );
}
