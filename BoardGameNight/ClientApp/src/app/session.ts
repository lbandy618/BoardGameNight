import { GameShelf } from "./game-shelf";

export interface Session {
    id: number;
    timePlayed: number;
    winner: string;
    enjoyment: number;
    ownedId: number;

    owned: GameShelf;
    events: any[];
    sessionAttendees: any[];
}

