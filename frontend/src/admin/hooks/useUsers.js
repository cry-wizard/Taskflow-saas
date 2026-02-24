import { useEffect, useState } from "react";
import { fetchUsers } from "../api/user.api";

export default function useUsers() {
  const [users, setUsers] = useState([]);

  const refetch = async () => {
    const data = await fetchUsers();
    setUsers(data || []);
  };

  useEffect(() => {
    refetch();
  }, []);

  return { users, refetch };
}