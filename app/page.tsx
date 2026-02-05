import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        {/* Hero */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          <span className="text-primary">vi</span>handlar.se
        </h1>
        <p className="text-xl text-muted-foreground mb-8 animate-fade-in animation-delay-100">
          E-nummerskanner & Smarta Inköpslistor
        </p>
        
        {/* Feature cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-12">
          <Link 
            href="/e-amnen" 
            className="group p-6 border rounded-lg hover:border-primary hover-scale transition-all animate-fade-in animation-delay-200"
          >
            <div className="text-3xl mb-3">🔍</div>
            <h2 className="font-semibold mb-2 group-hover:text-primary transition-colors">E-ämnen</h2>
            <p className="text-sm text-muted-foreground">
              Scanna och lär dig om tillsatser
            </p>
          </Link>
          
          <Link 
            href="/livsmedel" 
            className="group p-6 border rounded-lg hover:border-primary hover-scale transition-all animate-fade-in animation-delay-300"
          >
            <div className="text-3xl mb-3">🥗</div>
            <h2 className="font-semibold mb-2 group-hover:text-primary transition-colors">Livsmedel</h2>
            <p className="text-sm text-muted-foreground">
              Guide till svenska livsmedel A-Ö
            </p>
          </Link>
          
          <Link 
            href="/inkopslistor" 
            className="group p-6 border rounded-lg hover:border-primary hover-scale transition-all animate-fade-in animation-delay-400"
          >
            <div className="text-3xl mb-3">📝</div>
            <h2 className="font-semibold mb-2 group-hover:text-primary transition-colors">Inköpslistor</h2>
            <p className="text-sm text-muted-foreground">
              Skapa och dela smarta listor
            </p>
          </Link>
        </div>
        
        {/* Status */}
        <div className="text-sm text-muted-foreground animate-fade-in animation-delay-500">
          <p className="mb-2">🚧 Under utveckling - Next.js 15 migration</p>
          <p>
            <Link href="/docs/ROADMAP.md" className="text-primary hover:underline">
              Se ROADMAP.md för status
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
