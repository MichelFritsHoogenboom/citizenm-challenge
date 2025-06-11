# citizenm-challenge

The user story is: "as a customer I want to be able to switch between the currency of the hotel and other currencies available".

Can you create a smooth, seamless, and delightful currency switch experience for our global bookers?

The output of the story contains a few components:

- An overview page of available hotels in Europe
- A repeated offer card
- A currency switch

### Acceptance criteria

- Create a responsive overview of the available offers
- On load show the currency of the hotel in the offer card, with the following properties: name of the hotel, image, short description, "price per night, starting from" and a cta
- When a different currency is selected, show the price in the offer card in the chosen currency
- spend a maximum of 4 hours on this task

### Setup

    npm install
    npx nuxi dev

ga naar http://localhost:3000/

### Uitleg

Ik heb een aantal aannames gedaan, aangezien ik geen reactie heb gekregen op mijn vragen en er een maximum van 4 uur voor deze opdracht was:

- De prijzen in de offers zijn voor de kamers per nacht, in de valuta van het hotel
- De valuta van het hotel is de base voor die rate
- 'A repeated offer card' Op basis van het design en beschrijving heb ik het zo gemaakt dat de hoofdresultaten van de offers.json als cards worden getoond. De "price per night, starting from" die getoond wordt is van de goedkoopste offer uit de arrays offer van da object uit de json

- Nuxt is gekozen omdat het server-side rendering biedt voor snelle pageloads zonder extra API calls, ingebouwde API routes heeft voor data fetching, en een fijn framework is om snel dingen mee op te zetten. Daarnaast biedt het automatische TypeScript support en efficiënte state management met `useState`. En niet het meest onbelangrijk, jullie gebruiken het ook zelf.
- Styling is net niet helemaal afgekomen binnen de 4 uur, ik had de dropdown nog willen doen en de css iets meer structuur willen geven. Scss voor wat mixins. Maar het lijkt me dat je hier wel wat uit op kan maken.
- Voor nu is gekozen voor Vue's scoped styling omdat:
  • Het perfect past bij de component-gebaseerde architectuur
  • Elke component zijn eigen geïsoleerde styles heeft
  • Het zorgt voor betere performance door alleen relevante CSS te laden
  • Het makkelijker te onderhouden is binnen de 4-uur tijdslimiet

  Voor toekomstige uitbreidingen zou een combinatie van BEM en scoped styling beter kunnen zijn wanneer:
  • Er een gedeeld design system wordt opgezet
  • Er meer complexe layout componenten komen
  • Er meer dynamische styling nodig is
  • Er een striktere CSS architectuur nodig is

- Qua fonts heb ik alleen woff2 gebruikt omdat oude browsers niet meer gesupport hoeven worden. Ik heb wel een font van de site gestolen om het design wat beter te kunnen namaken, deze werd niet meegeleverd in het design.
- Klein issue in de offers.json gevonden, currency van het glasgow hotel was niet helemaal in orde.
- Ik heb er omwille van tijd bewust voor gekozen om de currency switcher en de button niet als een apart component te maken. Dit zou ik normaal gesproken wel hebben gedaan, maar kan prima bij een volgende iteratie.
- Ik ben niet toegekomen aan de unit tests. Die had ik wel gemaakt als ik meer tijd had gehad. Hier had ik Vitest voor gebruikt omdat dit de standaard testing framework is voor Vue/Nuxt projecten en uitstekend werkt met TypeScript en component testing.
- Voor de currency conversie heb ik gekozen voor een server-side API endpoint omdat:
  • Dit voorkomt dat de exchange rates in de frontend code komen
  • Het makkelijker is om de rates te updaten en cachen
  • Het veiliger is omdat de rates niet in de client code staan

- Voor de state management heb ik `useState` gebruikt in plaats van Pinia omdat:
  • Het ingebouwd is in Nuxt en geen extra dependencies nodig heeft
  • Het perfect werkt voor deze simpele use case, wanneer de applicatie complexer wordt zou ik overwegen om Pinia te gebruiken omdat een centrale state manager misschien overzichtelijker is en het meer mogelijkehden op debugging heeft.
