const CountriesArr = [
  "Áustria",
  "Bélgica",
  "Bulgária",
  "Croácia",
  "Chipre",
  "República Checa",
  "Dinamarca",
  "Estónia",
  "Finlândia",
  "França",
  "Aleamanha",
  "Grécia",
  "Hungria",
  "Irlanda",
  "Itália",
  "Letônia",
  "Lituânia",
  "Luxemburgo",
  "Malta",
  "Países Baixos",
  "Polónia",
  "Portugal",
  "Roménia",
  "Eslováquia",
  "Eslovénia",
  "Espanha",
  "Suécia",
];
const CountriesCodesArr = [
  "AUS",
  "BEL",
  "BGR",
  "HRV",
  "CYP",
  "CZE",
  "DNK",
  "EST",
  "FIN",
  "FRA",
  "DEU",
  "GRC",
  "HUN",
  "IRL",
  "ITA",
  "LVA",
  "LTU",
  "LUX",
  "MAL",
  "NLD",
  "POL",
  "PRT",
  "ROU",
  "SVK",
  "SVN",
  "ESP",
  "SWE",
];

const countriesObj = () => {
  const tempArr = [];
  CountriesArr.forEach((country, index) => {
    tempArr.push({ country: country, code: CountriesCodesArr[index] });
  });
  return tempArr;
};

export const countriesData = countriesObj();
