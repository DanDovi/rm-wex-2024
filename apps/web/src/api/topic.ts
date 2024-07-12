import { getUserDetails } from "../utils/authToken"

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const createTopic = async (title: string, createdBy: string, description: string) => {
    const userDetails = getUserDetails();

    if (!userDetails) {
        console.error('no token')
        return;
    }

    const result = await fetch(`${baseUrl}/topic/create`, {
        method: 'POST',
        body: JSON.stringify({title, createdBy, description}),
        headers: {
            "Authorization": `Bearer ${userDetails.accessToken}`,
            "Content-Type": "application/json",
          },
    })

    if (result.status !== 200) {
        throw new Error('Topic failed to be created');
    }
};