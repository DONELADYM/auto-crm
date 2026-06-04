"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kanban, Plus, Trash2, ArrowUp, ArrowDown, Trophy, X } from "lucide-react";
import { toast } from "sonner";

type Stage = {
  id: string;
  name: string;
  color: string;
  order: number;
  isWon: boolean;
  isLost: boolean;
};

const COLORS = ["#64748b", "#2563eb", "#8b5cf6", "#ea580c", "#16a34a", "#dc2626", "#0891b2", "#ca8a04"];

export function StageEditor() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [newName, setNewName] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () =>
    fetch("/api/pipeline")
      .then((r) => r.json())
      .then((d) => setStages(Array.isArray(d) ? d : d.stages || []));

  useEffect(() => {
    load();
  }, []);

  const addStage = async () => {
    if (!newName.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/stages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });
      if (!res.ok) throw new Error();
      setNewName("");
      await load();
      toast.success("Etapa agregada");
    } catch {
      toast.error("Error al agregar la etapa");
    } finally {
      setBusy(false);
    }
  };

  const updateStage = async (id: string, patch: Partial<Stage>) => {
    setStages((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    try {
      await fetch(`/api/stages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
    } catch {
      toast.error("Error al guardar");
    }
  };

  const deleteStage = async (id: string) => {
    if (!confirm("¿Eliminar esta etapa?")) return;
    try {
      const res = await fetch(`/api/stages/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "No se pudo eliminar");
        return;
      }
      await load();
      toast.success("Etapa eliminada");
    } catch {
      toast.error("Error al eliminar");
    }
  };

  // Intercambiar orden con la etapa vecina
  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= stages.length) return;
    const a = stages[index];
    const b = stages[target];
    await Promise.all([
      updateStage(a.id, { order: b.order }),
      updateStage(b.id, { order: a.order }),
    ]);
    await load();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Kanban className="h-4 w-4" />
          Etapas del Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {stages.map((stage, i) => (
          <div key={stage.id} className="flex items-center gap-2 p-2 rounded-lg border">
            {/* Color */}
            <input
              type="color"
              value={stage.color}
              onChange={(e) => updateStage(stage.id, { color: e.target.value })}
              className="h-7 w-7 rounded cursor-pointer border-0 bg-transparent p-0 shrink-0"
              title="Color"
            />
            {/* Nombre editable */}
            <Input
              value={stage.name}
              onChange={(e) =>
                setStages((p) => p.map((s) => (s.id === stage.id ? { ...s, name: e.target.value } : s)))
              }
              onBlur={(e) => updateStage(stage.id, { name: e.target.value })}
              className="h-8 flex-1"
            />
            {/* Marca de ganado */}
            <button
              onClick={() => updateStage(stage.id, { isWon: !stage.isWon, isLost: false })}
              className={`p-1.5 rounded cursor-pointer ${stage.isWon ? "bg-green-100 text-green-700" : "text-muted-foreground hover:bg-muted"}`}
              title="Marcar como etapa ganada"
            >
              <Trophy className="h-4 w-4" />
            </button>
            {/* Marca de perdido */}
            <button
              onClick={() => updateStage(stage.id, { isLost: !stage.isLost, isWon: false })}
              className={`p-1.5 rounded cursor-pointer ${stage.isLost ? "bg-red-100 text-red-700" : "text-muted-foreground hover:bg-muted"}`}
              title="Marcar como etapa perdida"
            >
              <X className="h-4 w-4" />
            </button>
            {/* Orden */}
            <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1 rounded cursor-pointer hover:bg-muted disabled:opacity-30" title="Subir">
              <ArrowUp className="h-4 w-4" />
            </button>
            <button onClick={() => move(i, 1)} disabled={i === stages.length - 1} className="p-1 rounded cursor-pointer hover:bg-muted disabled:opacity-30" title="Bajar">
              <ArrowDown className="h-4 w-4" />
            </button>
            {/* Eliminar */}
            <button onClick={() => deleteStage(stage.id)} className="p-1 rounded cursor-pointer text-destructive hover:bg-destructive/10" title="Eliminar">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}

        {/* Agregar etapa */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <Input
            placeholder="Nombre de la nueva etapa"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addStage()}
            className="h-9"
          />
          <Button onClick={addStage} disabled={busy || !newName.trim()} className="cursor-pointer shrink-0">
            <Plus className="h-4 w-4 mr-1" /> Agregar
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          🏆 = etapa ganada · ✕ = etapa perdida · usa las flechas para reordenar.
          Los cambios se guardan automáticamente. Paleta sugerida:{" "}
          {COLORS.map((c) => (
            <span key={c} className="inline-block h-3 w-3 rounded-full mx-0.5 align-middle" style={{ backgroundColor: c }} />
          ))}
        </p>
      </CardContent>
    </Card>
  );
}
