"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const response = await fetch("/api/me");
      const data = await response.json();

      setUser(data.user);
    }

    getUser();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
}