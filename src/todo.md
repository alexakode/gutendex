Krav:
1. søke etter bøker
* header med søkefelt
* søkeresultat som liste med *paginering* ved hjelp av APIets innebygde funksjon

2. Kategorimeny
* Applikasjonen skal ha en meny med lenker til følgende kategorier
- Fiction
- Mystery
- Thriller
- Romance
- Fantasy
- Morality
- Society
- Power
- Justice
- Adventure
- Tragedy
- War
- Philosophy

* Når brukeren klikker på en kategori, skal applikasjonen gjøre et API-kall til /books?topic=kategori og vise bøker i kategorien. Menyen kan plasseres i headeren for enkel tilgang.

3. Favorittbøker
* Applikasjonen skal ha en funksjon for å lagre favorittbøker. Dette må være tilgjengelig via egen lenke i *meny/header*
* Favorittbøker skal lagres i *localStorage* slik at de forblir tilgjengelige selv om siden oppdateres.
* Når brukeren klikker på «favoritter», skal en liste over favorittbøker vises

4. Bokdetaljer
* Ved å klikke på en bok fra søkeresultatene eller kategorioversikten, skal brukeren tas til en *detaljside* som viser informasjon om den valgte boken.
* Informasjonen på detaljsiden skal inkludere
- boktittel
- coverbilde
- forfatter
- antall nedlastinger
- kategori
- språk
- lenke til boka i digitalt format
- en knapp for «legg til i favoritter»

Tekniske krav
1. Routing
* Bruk `createBrowserRouter` fra *react-router-dom* for å sette opp routing i applikasjone
* kategorilinker og individuelle bøker skal bruke *dynamiske lenker*
* Header/meny skal alltid være synlig uansett hvilken side brukeren er på
2. State-håndtering
* Bruk Reacts *state* til å håndtere applikasjonsdata, som søkeresultater, kategoribøker og favoritter.
* Implementer visning av *loading-status* og *feilmeldinger* dersom API-kall tar tid eller mislykkes

3. Styling
* Vi kan bruke hvilken som helst tilnærming til CSS (global, moduler eller biblioteker)
* Applikasjonen skal være responsiv

4. API-dokmentasjon
* Bruk https://gutendex.com/ for å forstå hvordan du henter data.

Tips
* Begynn med å sette opp grunstrukturen for prosjektet, inkludert routing og komponenter.
* Del opp oppgaven i mindre deler, som for eksempel søkefunksjonalitet, kategorilister og favoritter.
* Test underveis
* Rydd opp i forskjell på localhost og produksjon ved å bruke miljøvariabler for API-endepunkter
* Sjekk tanstack query for enklere datahåndtering og caching (gjør siden raskere): https://tanstack.com/query/v4
* Dialogbokser for bokvisning kan lages med biblioteker som Radix UI eller Material-UI
* Oppdater favoritter
* hooks for å organisere kode bedre

Merge innhold fra BookDetail og BookDialog til en enkelt komponent for bokdetaljer
teste at dialog fungerer
rydde css-duplikater
slette pages/BookDetail.jsx når dialogen fungerer