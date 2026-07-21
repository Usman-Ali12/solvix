export type KanbanCard = {
  id: string;
  title: string;
  subtitle: string;
  meta?: string;
  tag?: { label: string; color: "green" | "blue" | "yellow" | "red" | "gray" };
};

export type KanbanColumn = {
  id: string;
  title: string;
  cards: KanbanCard[];
  accent?: string;
};

import Badge from "@/components/dashboard/Badge";

export default function KanbanBoard({ columns }: { columns: KanbanColumn[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((col) => (
        <div
          key={col.id}
          className="flex w-72 shrink-0 flex-col rounded-2xl border border-slate-line bg-void-soft"
        >
          <div className="flex items-center justify-between border-b border-slate-line px-4 py-3">
            <p className="text-sm font-medium text-paper">{col.title}</p>
            <span className="rounded-full bg-void-dim px-2 py-0.5 text-xs text-slate-soft">
              {col.cards.length}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-3 p-3">
            {col.cards.map((card) => (
              <div
                key={card.id}
                className="rounded-xl border border-slate-line bg-void p-3.5 transition-colors hover:border-signal/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-paper">{card.title}</p>
                  {card.tag && <Badge color={card.tag.color}>{card.tag.label}</Badge>}
                </div>
                <p className="mt-1 text-xs text-slate-soft">{card.subtitle}</p>
                {card.meta && (
                  <p className="mt-2.5 font-mono text-[11px] text-circuit">{card.meta}</p>
                )}
              </div>
            ))}
            {col.cards.length === 0 && (
              <p className="px-1 py-6 text-center text-xs text-slate-soft">Nothing here</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
