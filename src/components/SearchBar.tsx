import { Search } from "lucide-react";
import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NavSearchComponent() {
  const [query, setQuery] = React.useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // Implémentez ici la logique de recherche
    console.log("Recherche pour:", query);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <Label htmlFor="search" className="sr-only">
        Rechercher
      </Label>
      <Input
        id="search"
        type="search"
        placeholder="Rechercher..."
        className="pr-8 pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <button type="submit" className="sr-only">
        Lancer la recherche
      </button>
    </form>
  );
}
