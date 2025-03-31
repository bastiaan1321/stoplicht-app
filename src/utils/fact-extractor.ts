
export function extractFactsFromCoverageJSON(data: any) {
  const ranges = data?.coverages?.[0]?.ranges || {};
  const get = (key: string) => ranges[key]?.values?.[0] ?? null;

  return {
    temperature: get("ta"),
    windSpeed: get("ff"),
    windGust: get("fx"),
    windDirection: get("dd")
  };
}
