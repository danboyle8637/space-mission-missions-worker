import { getErrorMessage, getMissionDocs } from "../helpers/worker";
import type { Env, AddMissionBody } from "../types";

export async function addMission(
  request: Request,
  env: Env
): Promise<Response> {
  const formattedReq = new Response(request.body);
  const body: AddMissionBody = await formattedReq.json();
  const { mission } = body;

  if (!mission) {
    const response = new Response("Bad Request", { status: 500 });
    return response;
  }

  try {
    await env.MISSIONS.put(mission.missionId, JSON.stringify(mission));

    const updatedMissionDocs = await getMissionDocs(env);

    const response = new Response(JSON.stringify(updatedMissionDocs), {
      status: 200,
    });
    return response;
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
}
