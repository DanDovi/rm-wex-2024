const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const createTopic = async (
  title: string,
  createdBy: string,
  description: string,
) => {
  const tokenJson = localStorage.getItem("token");

  if (!tokenJson) {
    console.error("no token");
    return;
  }

  const tokenObj = JSON.parse(tokenJson);

  if (!tokenObj?.accessToken || typeof tokenObj.accessToken === "string") {
    console.error("Invalid token obj");
  }

  const result = await fetch(`${baseUrl}/topic/create`, {
    method: "POST",
    body: JSON.stringify({ title, createdBy, description }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenObj.accessToken}`,
    },
  });

  if (result.status !== 200) {
    throw new Error("create topic failed");
  }
};
