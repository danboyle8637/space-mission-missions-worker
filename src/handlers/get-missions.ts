import { getErrorMessage, getMissionDocs } from "../helpers/worker";
import type { Env, MissionDoc } from "../types";

export async function getMissions(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    const missionDocs = await getMissionDocs(env);

    const response = new Response(JSON.stringify(missionDocs), { status: 200 });
    return response;
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
}
