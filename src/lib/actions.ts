import {
  createProjectMutation,
  createUserMutation,
  getUserQuery,
} from '@/graphql';
import { GraphQLClient } from 'graphql-request';

import { ProjectForm } from '../../common';

const apiUrl = process.env.NEXT_PUBLIC_GRAFBASE_API_URL!;
const apiKey = process.env.NEXT_PUBLIC_GRAFBASE_API_KEY!;
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    const data = await client.request(query, variables);
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const getUser = (email: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = ({
  name,
  email,
  avatarUrl,
}: {
  name: string;
  email: string;
  avatarUrl: string;
}) => {
  client.setHeader('x-api-key', apiKey);
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader('Authorization', `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};
