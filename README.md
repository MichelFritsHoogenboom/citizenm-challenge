# citizenm-challenge
The user story is: “as a customer I want to be able to switch between the currency of the hotel and other currencies available”. 

Can you create a smooth, seamless, and delightful currency switch experience for our global bookers? 

The output of the story contains a few components:
- An overview page of available hotels in Europe
- A repeated offer card 
- A currency switch
  
### Acceptance criteria
Create a responsive overview of the available offers

On load show the currency of the hotels in the offer card, with the following properties: name of the hotel, image, short description, “price per night, starting from” and a cta
When a different currency is selected, show the price in the offer card in the chosen currency

### Uitleg
Ik heb een aantal aannames gedaan:
- De prijzen in de offers zijn voor de kamers per nacht, in de valuta van het hotel
- De valuta van het hotel is de base voor die rate
- 'A repeated offer card' Op basis van het design en beschrijving heb ik het zo gemaakt dat de hoofdresultaten van de offers.json als cards worden getoond. De “price per night, starting from” die getoond wordt is van de goedkoopste offer uit de arrays offer van da object uit de json

- Ik heb Nuxt gebruikt om de data server side te laden zodat je geen call meer krijg op pageload. Verder is het ook gewoon een fijn framework waar je snel dingen mee opzet en jullie natuurlijk ook mee werken :)
- Styling is net niet helemaal afgekomen binnen de 4 uur, ik had de dropdown nog willen doen en de css iets meer structuur willen geven. Scss voor wat mixins. Maar het lijkt me dat je hier wel wat uit op kan maken.
- Qua fonts heb ik alleen woff2 gebruikt omdat oude browsers niet meer gesupport hoeven worden. Ik heb wel een font van de site gestolen om het design wat beter te kunnen namaken.
- Klein issue in de offers.json gevonden, currency van het glasgow hotel was niet helemaal in orde.
- Ik heb een klein beetje gecheat met de Typescript. Na de 4 uur voor de opdracht heb ik de dag erna nog een klein uurtje besteed om het om te zetten naar Typescript. Enerzijds omdat het een prima projectje was om daar zo eens mee te spelen anderzijds voor jullie ook handig om te zien wat er dan zo van bak, aangezien jullie ook die kant op willen

Er is vast nog wel meer te vertellen, maar dat is voor donderdag! 

