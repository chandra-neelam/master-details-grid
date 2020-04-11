export class Country {
    name: string;
    capital: string;
    region: string;
    population: number;
    flag: string;
    languages: Array<Language>;
    displayDetails: boolean;
}

export class Language {
    iso639_2: string;
    name: string;
    nativeName: string;
}

export class CountrySearchCriteria {
    countryName: string;
    population: number;
}