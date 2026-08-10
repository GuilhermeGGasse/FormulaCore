import { Driver } from "./driver";
import { Race } from "./race";
import { Team } from "./team";
import { Car } from "./car";

export interface Result {
    id: number;
    position: number;
    points: number;
    laps: number;
    status: string;
    raceId: number;
    driverId: number;
    teamId: number;
    driver: Driver;
    race: Race;
    team: Team;
    car: Car;
}