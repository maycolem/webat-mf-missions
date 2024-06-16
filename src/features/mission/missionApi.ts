import { CalimacoApi } from "@/constants";
import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery, BaseQueryApi } from "@reduxjs/toolkit/query";
import type { FetchArgs } from "@reduxjs/toolkit/query";
import {
  GetMissionsResponse,
  GetUserMissionsResponse,
} from "./missionApiTypes";

const customQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  args = appendQueryStringParam(args, "company", CalimacoApi.company as string);
  args = appendQueryStringParam(
    args,
    "currency",
    CalimacoApi.currency as string
  );

  return await fetchBaseQuery({
    baseUrl: CalimacoApi.base,
    timeout: 1000 * 15,
  })(args, api, extraOptions);
};

function appendQueryStringParam(
  args: string | FetchArgs,
  key: string,
  value: string
): string | FetchArgs {
  let urlEnd = typeof args === "string" ? args : args.url;

  if (urlEnd.indexOf("?") < 0) urlEnd += "?";
  else urlEnd += "&";

  urlEnd += `${key}=${value}`;

  return typeof args === "string" ? urlEnd : { ...args, url: urlEnd };
}

export const missionApi = createApi({
  reducerPath: "missionApi",
  baseQuery: customQuery,

  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: ({ alias, password }) => {
        const body = new URLSearchParams();
        body.append("alias", alias);
        body.append("password", password);
        return {
          url: "/auth/login",
          body,
          method: "post",
        };
      },
    }),
    getMissions: builder.query<GetMissionsResponse["missions"], void | null>({
      query: () => {
        return {
          url: CalimacoApi.missions.getMissions,
        };
      },
      transformResponse(baseQueryReturnValue: GetMissionsResponse, meta, arg) {
        return baseQueryReturnValue?.missions;
      },
    }),
    getUserMissions: builder.query<GetUserMissionsResponse, string>({
      query: (session) => {
        const body = new URLSearchParams();
        body.append("session", session);
        return {
          url: CalimacoApi.missions.getUserMissions,
          body,
          method: "post",
        };
      },
    }),
  }),
});

export const {
  useGetMissionsQuery,
  useGetUserMissionsQuery,
  useLoginMutation,
} = missionApi;
