export const BASE_URL = "https://eurocos.alemtilsimat.com/api";

type FetcherArgs = {
  url: string;
  method?: string;
  body?: any;
};

export const fetcher = async ({ url, method = "GET", body }: FetcherArgs) => {
  const res = await fetch(BASE_URL + url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return res.json();
};
