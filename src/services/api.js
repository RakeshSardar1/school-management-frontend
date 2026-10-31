import axios from "axios";
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const Api = () => {
  const instance = axios.create({
    baseURL: "https://vmxqppikwqssxqtquedo.supabase.co/rest/v1/",
    headers: {
      apikey: supabaseKey,
      "Content-Type": "application/json",
    },
  });

  return instance;
};

export { Api };
