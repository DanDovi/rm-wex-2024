import { getUserDetails } from "../utils/authToken"

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const createComment = async (title: string, createdBy: string, description: string) => {
    const userDetails = getUserDetails();

    if (!userDetails) {
        console.error('no token')
        return;
    }

    const result = await fetch(`${baseUrl}/comment/create`, {
        method: 'COMMENT',
        body: JSON.stringify({title, createdBy, description}),
        headers: {
            "Authorization": `Bearer ${userDetails.accessToken}`,
            "Content-Type": "application/json",
          },
    })

    if (result.status !== 200) {
        throw new Error('Comment failed to be created');
    }

    if (result.status === 200) {
        console.log('Success');
    }
};