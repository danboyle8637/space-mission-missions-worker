import { setMissions, getMissions } from "./handlers";
import type { Env, Actions } from "./types";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    const workerAction: Actions =
      (url.pathname.split("/").pop() as Actions) || "";

    switch (workerAction) {
      case "set-missions": {
        if (request.method !== "GET") {
          return new Response("Bad Request", { status: 405 });
        }

        return setMissions(request, env);
      }
      case "get-missions": {
        if (request.method !== "GET") {
          return new Response("Bad Request", { status: 405 });
        }

        return getMissions(request, env);
      }
      default: {
        return new Response("Bad Request", { status: 500 });
      }
    }
  },
};
