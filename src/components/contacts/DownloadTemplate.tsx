"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

// Genera y descarga una plantilla Excel de ejemplo con los encabezados correctos
export function DownloadTemplate({
  variant = "outline",
  size = "sm",
}: {
  variant?: "outline" | "secondary" | "ghost";
  size?: "sm" | "default";
}) {
  const [busy, setBusy] = useState(false);

  const download = async () => {
    setBusy(true);
    try {
      const XLSX = await import("xlsx");
      const rows = [
        ["Nombre", "Telefono", "Email", "Empresa", "Fuente", "Notas"],
        ["Ana Torres", "5512345678", "ana@correo.com", "Tienda Ana", "facebook_lead", "Interesada en plan premium"],
        ["Luis Mendez", "5598765432", "luis@correo.com", "Constructora LM", "referido", "Pidio cotizacion"],
        ["Maria Garcia", "5544556677", "maria@correo.com", "", "website", ""],
      ];
      const ws = XLSX.utils.aoa_to_sheet(rows);
      ws["!cols"] = [{ wch: 18 }, { wch: 14 }, { wch: 22 }, { wch: 18 }, { wch: 16 }, { wch: 28 }];
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Contactos");
      XLSX.writeFile(wb, "plantilla-contactos.xlsx");
      toast.success("Plantilla descargada");
    } catch {
      toast.error("No se pudo generar la plantilla");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button variant={variant} size={size} onClick={download} disabled={busy} className="cursor-pointer">
      <Download className="h-4 w-4 mr-1" />
      Plantilla Excel
    </Button>
  );
}
