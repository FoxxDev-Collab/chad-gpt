export function ChadLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <h1 className="text-xl font-bold tracking-tight">
        Chad<span className="text-primary">GPT</span>
      </h1>
      <p className="text-[11px] text-muted-foreground">
        Your grumpiest AI assistant
      </p>
    </div>
  )
}
