import { useQuery } from "@tanstack/react-query";
import {getTeams, getTeamById} from "../api/teams";

export function useTeams() {
    return useQuery({
        queryKey: ["teams"],
        queryFn: getTeams,
    });
}
export function useTeam(id: number) {
    return useQuery({
        queryKey: ["teams", id],
        queryFn: () => getTeamById(id),
    });
}