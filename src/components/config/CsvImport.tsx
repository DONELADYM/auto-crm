"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Check } from "lucide-react";
import { toast } from "sonner";

// Mapeo de columnas comunes (es/en) → campo estándar
const FIELD_MAP: Record<string, string> = {
  name: "name", nombre: "name", "full name": "name", "nombre completo": "name",
  email: "email", correo: "email", "correo electronico": "email",
  phone: "phone", telefono: "phone", celular: "phone", whatsapp: "phone", "phone number": "phone",
  company: "company", empresa: "company", negocio: "company",
  notes: "notes", notas: "notes", mensaje: "notes", comentarios: "notes",
};

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const splitLine = (line: string) =>
    line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
  const headers = splitLine(lines[0]).map((h) => h.toLowerCase());
  return lines.slice(1).map((line) => {
    const cells = splitLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      const field = FIELD_MAP[h] || h;
      if (cells[i]) row[field] = cells[i];
    });
    return row;
  });
}

export function CsvImport() {
  const router = useRouter();
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [fileName, setFileName] = useState("");
  const [importing, setImporting] = useState(false);

  const onFile = async (file: File) => {
    const text = await file.text();
    const parsed = parseCSV(text).filter((r) => r.name);
    setRows(parsed);
    setFileName(file.name);
    if (parsed.length === 0) {
      toast.error("No se encontraron contactos con nombre. Revisa que el CSV tenga una columna 'nombre' o 'name'.");
    }
  };

  const doImport = async () => {
    if (rows.length === 0) return;
    setImporting(true);
    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contacts: rows.map((r) => ({ ...r, source: r.source || "import" })) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success(`${data.imported} contactos importados${data.failed ? `, ${data.failed} fallidos` : ""}`);
      setRows([]);
      setFileName("");
      router.refresh();
    } catch {
      toast.error("Error al importar");
    } finally {
      setImporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Importar contactos (CSV)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Sube un archivo CSV. Detecta automáticamente columnas como nombre,
          email, teléfono, empresa (en español o inglés).
        </p>

        <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">
            {fileName || "Haz clic para elegir un archivo CSV"}
          </span>
          <input
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
        </label>

        {rows.length > 0 && (
          <>
            <div className="rounded-lg border max-h-48 overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 sticky top-0">
                  <tr>
                    <th className="text-left p-2 font-medium">Nombre</th>
                    <th className="text-left p-2 font-medium">Teléfono</th>
                    <th className="text-left p-2 font-medium">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 50).map((r, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">{r.name}</td>
                      <td className="p-2 text-muted-foreground">{r.phone || "—"}</td>
                      <td className="p-2 text-muted-foreground">{r.email || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {rows.length} contactos listos para importar
              </span>
              <Button onClick={doImport} disabled={importing} className="cursor-pointer">
                <Check className="h-4 w-4 mr-1" />
                {importing ? "Importando..." : `Importar ${rows.length}`}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
