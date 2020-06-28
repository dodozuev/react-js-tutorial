export const PROBABLE_ACTION = "PROBABLE_ACTION";

interface MetaInfo {
  probability: number;
}
export type ProbableAction = {
  type: string;
  meta?: MetaInfo;
};

export interface ProbableState {
  status?: string;
  message?: string;
}

export const actWithProbability = (probability: number): ProbableAction => ({
  type: PROBABLE_ACTION,
  meta: { probability },
});
