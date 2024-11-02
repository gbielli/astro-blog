import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X } from "lucide-react";
import * as React from "react";

interface BlogPost {
  title: string;
  slug: string;
  description?: string;
  date: string;
}

interface SearchBarProps {
  articles: BlogPost[];
}

export default function SearchBar({ articles }: SearchBarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<BlogPost[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }

      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setQuery("");
        setSearchResults([]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const performSearch = React.useCallback(
    (searchTerm: string) => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    },
    [articles]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    performSearch(newQuery);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setQuery("");
    setSearchResults([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full max-w-sm mx-auto relative text-muted-foreground justify-start px-10"
        >
          <Search className="absolute left-3 h-4 w-4" />
          Rechercher un article...
          <kbd className="pointer-events-none absolute right-3 top-[50%] -translate-y-[50%] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] p-0">
        <div className="sticky top-0 bg-background border-b p-4 rounded-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              ref={inputRef}
              value={query}
              onChange={handleInputChange}
              placeholder="Rechercher un article..."
              className="pl-10 pr-10"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => {
                  setQuery("");
                  setSearchResults([]);
                  inputRef.current?.focus();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="max-h-[50vh] p-4">
          {query.trim() === "" ? (
            <div className="text-center text-muted-foreground py-6">
              Commencez à taper pour rechercher des articles
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-lg border p-4 hover:bg-muted transition-colors"
                >
                  <a
                    href={`/posts/${post.slug}/`}
                    onClick={handleLinkClick}
                    className="block space-y-2"
                  >
                    <h3 className="text-[20px] font-medium group-hover:underline">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.description}
                      </p>
                    )}
                    <time className="text-sm text-muted-foreground block">
                      {post.date}
                    </time>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-6">
              Aucun article trouvé pour "{query}"
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
