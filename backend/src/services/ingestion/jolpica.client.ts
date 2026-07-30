// jolpica.client.ts
import axios from "axios";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export const jolpicaClient = {
  getRaces: async (season: number) => {
    const response = await axios.get(`${BASE_URL}/${season}/races.json`);
    return response.data.MRData.RaceTable.Races;
  },

  getResults: async (season: number, round: number) => {
    const response = await axios.get(`${BASE_URL}/${season}/${round}/results.json`);
    return response.data.MRData.RaceTable.Races[0]?.Results ?? [];
  },

  getDrivers: async (season: number) => {
    const response = await axios.get(`${BASE_URL}/${season}/drivers.json`);
    return response.data.MRData.DriverTable.Drivers;
  },

  getConstructors: async (season: number) => {
    const response = await axios.get(`${BASE_URL}/${season}/constructors.json`);
    return response.data.MRData.ConstructorTable.Constructors;
  },
};