import { KVNamespace } from "@cloudflare/workers-types";

export interface Env {
  MISSIONS: KVNamespace;
}

export type Actions = "set-missions" | "get-missions";

export type MissionId = "mars" | "titan" | "pleiades" | "prodigious" | "x24c89";

export interface MissionDoc {
  missionId: MissionId;
  coverImage: string;
  altTag: string;
  titleTag: string;
  headline: string;
  description: string;
  difficulty: number;
}

export interface AddMissionBody {
  mission: MissionDoc;
}
