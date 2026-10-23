import { api } from "./api";
import type {
  Camper,
  CampersResponse,
  CamperFilters,
  CamperForm,
  CamperTransmission,
  CamperEngine,
  CamperReview,
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

export async function getCamperById(camperId: string): Promise<Camper> {
  const { data } = await api.get(`/campers/${camperId}`);

  return data;
}

export async function getCamperReviews(
  camperId: string,
): Promise<CamperReview[]> {
  const { data } = await api.get<CamperReview[]>(
    `/campers/${camperId}/reviews`,
  );

  return data;
}
