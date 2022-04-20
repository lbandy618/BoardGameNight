import { GameShelf } from "./game-shelf";
import { GameNightEvent } from "./gamenightevent";

export interface Session {
    id: number;
    timePlayed: number;
    winner: string;
    enjoyment: number;
    ownedId: number;
    event:GameNightEvent;
    owned: GameShelf;
    events: GameNightEvent[];
    sessionAttendees: any[];
}

