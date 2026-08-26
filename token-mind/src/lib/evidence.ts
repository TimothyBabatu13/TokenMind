export type Evidence = {
  source: string;
  fetchedAt: string;
};

export const birdeyeEvidence = (): Evidence => {
  return {
    source: "Birdeye",
    fetchedAt: new Date().toISOString(),
  };
}

export const generatedEvidence = (): Evidence => {
  return {
    source: "generated",
    fetchedAt: new Date().toISOString(),
  };
}
