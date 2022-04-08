export interface User {
    id:number;
    loginId:string;
    age:number;
    summary:string;

    ownedGames: any[];
    preferences: any[];
    sessionAttendee: any[];
    userStat: any[];

}
