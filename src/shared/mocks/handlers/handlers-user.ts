import { http, HttpResponse } from "msw";

export const handlersUser = [
  // login
  http.post<never, { username: string; password: string }, { isAuth: boolean }>(
    "/login",
    async ({ request }) => {
      const data = await request.json();

      if (data.username === "Пользователь" && data.password === "1234") {
        return HttpResponse.json({ isAuth: true });
      }

      return HttpResponse.json({ isAuth: false });
    },
  ),

  // logout
  http.post<never, { username: string; password: string }, { isAuth: boolean }>(
    "/logout",
    async ({ request }) => {
      const data = await request.json();

      if (data.username === "Пользователь" && data.password === "1234") {
        return HttpResponse.json({ isAuth: false });
      }

      return HttpResponse.json({ isAuth: true });
    },
  ),
];
