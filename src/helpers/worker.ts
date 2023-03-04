import type { Env, MissionDoc } from "../types";

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const getMissionDocs = async (env: Env): Promise<MissionDoc[]> => {
  let missionDocs: MissionDoc[] = [];

  const missionsList = await env.MISSIONS.list();
  const missionsKeys = missionsList.keys;

  for (const key of missionsKeys) {
    const missionDocString = await env.MISSIONS.get(key.name);

    if (!missionDocString) {
      throw new Error("Could not get the missions.");
    }

    const missionDoc = JSON.parse(missionDocString);

    missionDocs.push(missionDoc);
  }

  return new Promise((resolve) => {
    resolve(missionDocs);
  });
};
