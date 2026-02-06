export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Laddar...</p>
      </div>
    </div>
  );
}
