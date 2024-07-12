import { getUserDetails } from "../utils/authToken";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export interface ITopic {
  id: string;
  title: string;
  description: string;
}

export const createTopic = async (
  title: string,
  createdBy: string,
  description: string,
) => {
  const userDetails = getUserDetails();

  if (!userDetails) {
    console.error("no token");
    return;
  }

  const result = await fetch(`${baseUrl}/topic/create`, {
    method: "POST",
    body: JSON.stringify({ title, createdBy, description }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`,
    },
  });

  if (result.status !== 200) {
    throw new Error("create topic failed");
  }
};

export const getAllTopics = async () => {
  const userDetails = getUserDetails();

  if (!userDetails) {
    console.error("no token");
    return;
  }

  const result = await fetch(`${baseUrl}/topic/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`,
    },
  });
  if (result.status !== 200) {
    throw new Error("failed to fetch topics");
  }
  const responseJson = await result.json();

  return responseJson.data as ITopic[];
};
