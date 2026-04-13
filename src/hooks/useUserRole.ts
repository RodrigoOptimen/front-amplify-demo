import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

export const useUserRole = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loadRole = async () => {
      const session = await fetchAuthSession();
      setRole(
        (session.tokens?.idToken?.payload["cognito:groups"] as string[])?.[0],
      );
    };
    loadRole();
  }, []);

  return {
    role,
  };
};
