import { getErrorMessage } from "../helpers/worker";
import { missions } from "../data";
import type { Env } from "../types";

export async function setMissions(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    for (let i = 0; i < missions.length; i++) {
      const missionId = missions[i].missionId;
      await env.MISSIONS.put(missionId, JSON.stringify(missions[i]));
    }

    return new Response("Missions successfully loaded", { status: 200 });
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
}
