import { useQuery } from "@tanstack/react-query";
export function useBook(bookId) {
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const response = await fetch(`https://gutendex.com/books/${bookId}/`);
      if (!response.ok) {
        throw new Error("Nettverksrespons var ikke ok");
      }
      // return response.json();
      const book = await response.json();
      const description =
        typeof book.description === "string"
          ? book.description
          : book.description?.value || "Ingen beskrivelse tilgjengelig.";
      // oversett
      // let translatedDescription = description;
      // try {
      //   if (description.trim().length > 0) {
      //     const translationRes = await fetch(
      //       "https://libretranslate.de/translate",
      //       {
      //         method: "POST",
      //         body: JSON.stringify({
      //           q: description,
      //           source: "en",
      //           target: "nb",
      //           format: "text",
      //         }),
      //         headers: { "Content-Type": "application/json" },
      //       }
      //     );
      //     const raw = await translationRes.text();
      //     console.log("Raw oversettelsesrespons:", raw);
      //     const translation = await translationRes.json();
      //     translatedDescription = translation.translatedText;
      //   }
      // } catch (error) {
      //   console.error("Oversettelse feilet:", error);
      //   translatedDescription = description;
      // }

      return { ...book, description };
    },
    enabled: !!bookId,
    staleTime: 1000 * 60 * 60 * 24, // 24 timer
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 dager
  });
}
