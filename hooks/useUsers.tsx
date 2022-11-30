import { API_URL } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchUser = async () => {
  const response = await fetch(`${API_URL}/users/1`);
  const data = await response.json();
  return data;
};

const updateUserName = async (userName: string) => {
  const response = await fetch(`${API_URL}/users/1`, {
    method: "PATCH",
    body: JSON.stringify({
      name: userName,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return await response.json();
};

export const useUserQuery = () =>
  useQuery(["user"], fetchUser, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

export const useUpdateUserNameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUserName, {
    onMutate: async (userName) => {
      await queryClient.cancelQueries("user");

      const prevUserData = queryClient.getQueryData(["user"]);

      queryClient.setQueryData(["user"], (prevData: any) => ({
        ...prevData,
        name: userName,
      }));

      return { prevUserData };
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData(["user"], newUser);
    },
    onError: (error, userName, { prevUserData }) => {
      queryClient.setQueryData(["user"], prevUserData);
    },
  });
};
