import { missionApi } from "@/features/mission/missionApi";

const rootMiddleware = (getDefaultMiddleware) => {
  return getDefaultMiddleware().concat(missionApi.middleware);
};

export default rootMiddleware;
