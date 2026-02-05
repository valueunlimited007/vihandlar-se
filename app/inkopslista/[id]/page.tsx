"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

// Redirect from /inkopslista/[id] to /inkopslista/dela/[id]
// The [id] here is treated as a share token
export default function ListByIdPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  useEffect(() => {
    router.replace(`/inkopslista/dela/${id}`);
  }, [id, router]);

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <p className="text-muted-foreground">Omdirigerar...</p>
    </div>
  );
}
