export interface Session {
    id: number;
    timePlayed: number;
    winner: string;
    enjoyment: number;
    ownedId: number;

    owned: any[];
    events: any[];
    sessionAttendees: any[];
}

