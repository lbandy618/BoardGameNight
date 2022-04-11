export interface Preferences {
    id: number;
    categories: string;
    mechanics: string;
    maxTime: number;
    publisher: string;
    yearPublished: number;
    userId: number;
    ownedId: number;

    owned: any[];
    user: any[];
}
