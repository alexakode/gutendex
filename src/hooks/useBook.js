import { useQuery } from "@tanstack/react-query";
export function useBook(bookId) {
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const response = await fetch(`https://gutendex.com/books/${bookId}/`);
      if (!response.ok) {
        throw new Error("Nettverksrespons var ikke ok");
      }
      return response.json();
    },
    enabled: !!bookId,
    staleTime: 1000 * 60 * 60 * 24, // 24 timer
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 dager
  });
}
