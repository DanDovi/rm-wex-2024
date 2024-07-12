import { getUserDetails } from "../utils/authToken";

export interface IPostResponse {
  data: Array<{
    content?: string;
    createdAt?: Date;
    createdBy?: string;
    deteledAt?: Date;
    id: string;
    title?: string;
    topicId?: string;
    updatedAt?: Date;
  }>
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllPosts = async () => {
    const userDetails = getUserDetails();

    if(!userDetails?.accessToken){return}

    const result = await fetch(`${baseUrl}/post`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userDetails.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (result.status === 401) {
      throw new Error('Unauthorized user!');
    }
    
    if (result.status !== 200) {
      throw new Error('Could not fetch posts');
    }

    const responseJson = (await result.json()) as IPostResponse;

    console.log(responseJson);

    return { posts: responseJson }
  };
  