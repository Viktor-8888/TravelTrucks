import { api } from "./api";
import type {
  CampersResponse,
  CamperFilters,
  CamperForm,
  CamperTransmission,
  CamperEngine,
} from "@/types/camper";

export interface CamperSearchParams {
  location?: string;
  form?: CamperForm;
  transmission?: CamperTransmission;
  engine?: CamperEngine;
}

export async function getCampers(
  page: number = 1,
  perPage: number = 4,
  filters: CamperSearchParams = {},
): Promise<CampersResponse> {
  const { data } = await api.get<CampersResponse>("/campers", {
    params: {
      page,
      perPage,
      ...filters,
    },
  });

  return data;
}

export async function getCamperFilters(): Promise<CamperFilters> {
  const { data } = await api.get<CamperFilters>("/campers/filters");

  return data;
}
