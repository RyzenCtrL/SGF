export function FormProgressBar({ completed, total }: { completed: number; total: number }) {
  const progress = total > 0 ? completed / total : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="h-1 w-full overflow-hidden rounded-full bg-stroke-subtle">
        <div
          className="h-full rounded-full bg-accent-lime transition-all duration-500 ease-smooth"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <span className="text-xs text-text-secondary">
        Заполнено {completed} из {total} обязательных полей
      </span>
    </div>
  );
}
