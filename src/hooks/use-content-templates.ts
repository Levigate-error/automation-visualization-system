import { useQuery } from "react-query";
import api from "@/api";
import { AxiosError, AxiosResponse } from "axios";
import { TemplateResponse } from "@/types";
import { Template } from "@/requests/templates";
import { isENodeResponseItemType } from "@/utils/is-enode-response-item-type";

export const CONTENT_TEMPLATES_QUERY_KEY = "content-templates-query-key";

export const useContentTemplates = () => {
  const { data, isLoading } = useQuery<
    AxiosResponse<TemplateResponse>,
    AxiosError,
    Template[]
  >([CONTENT_TEMPLATES_QUERY_KEY], api.getComponentTemplates, {
    select: (resp) =>
      Object.entries(resp.data)
        .filter(([id]) => isENodeResponseItemType(id))
        .map(([id, item]) => new Template(id, item)),
    retry: false,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });

  return { data: data || [], isLoading };
};
