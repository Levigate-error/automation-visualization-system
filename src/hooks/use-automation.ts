import { useQuery } from "react-query";
import api from "@/api";
import { AxiosError, AxiosResponse } from "axios";
import { TAutomationResponse } from "@/types/automation-response";
import { Automation } from "@/requests/automation";
import { useSelector } from "react-redux";
import { TState } from "@/store/types";
import { useAppDispatch } from "@/store";
import { setAutomations } from "@/store/automation";

export const AUTOMATIONS_QUERY_KEY = "automations-query-key";

export const useAutomations = () => {
  const { automations } = useSelector((state: TState) => state.automation);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery<
    AxiosResponse<{ data?: TAutomationResponse[] }>,
    AxiosError,
    Automation[]
  >([AUTOMATIONS_QUERY_KEY], api.getAutomations, {
    select: (resp) =>
      resp?.data?.data?.map((item) => new Automation(item)) || [],
    retry: false,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });

  if (!automations.length && data) {
    dispatch(setAutomations(data));
  }

  return { data: data || [], isLoading };
};
