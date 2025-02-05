import Client, { Environment } from "./client";

const getRequestClient = async () => {
  const env =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:4000"
      : Environment("staging");

  return new Client(env);
};

export const client = await getRequestClient();
export default getRequestClient;
