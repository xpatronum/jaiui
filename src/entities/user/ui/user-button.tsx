import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { Dialog, VisuallyHidden } from "radix-ui";

import { useUserStore } from "../model";

const UserButton = () => {
  const { isAuth, login, logout } = useUserStore((state) => state);

  const onLogin = () => {
    axios
      .post("/login", { username: "Пользователь", password: "1234" })
      .then(() => {
        login();
      });
  };

  const onLogout = () => {
    axios
      .post("/logout", { username: "Пользователь", password: "1234" })
      .then(() => {
        logout();
      });
  };
  if (isAuth) {
    return (
      <button
        onClick={onLogout}
        className="bg-base-100 text-primary-content hover:bg-base-200 focus-visible:outline-primary-content inline-flex size-12 items-center justify-center rounded-full focus-visible:outline-2"
      >
        <ArrowLeftStartOnRectangleIcon className="size-8" />
      </button>
    );
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-base-100 text-primary-content hover:bg-base-200 focus-visible:outline-primary-content inline-flex size-12 items-center justify-center rounded-full focus-visible:outline-2">
          <UserIcon className="size-8" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-base-100/50 fixed inset-0" />
        <Dialog.Content className="bg-base-200 fixed top-1/2 left-1/2 flex w-1/2 max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col items-start justify-start gap-8 rounded-md px-16 py-8 focus:outline-none">
          <Dialog.Title className="text-base-content text-lg font-semibold">
            Войти
          </Dialog.Title>
          <VisuallyHidden.Root>
            <Dialog.Description></Dialog.Description>
          </VisuallyHidden.Root>
          <fieldset className="flex w-full items-center justify-between gap-8">
            <label
              className="text-base-content w-16 text-left font-semibold"
              htmlFor="name"
            >
              Имя
            </label>
            <input
              className="text-primary-content focus:shadow-primary-content inline-flex h-8 flex-1 grow items-center justify-center rounded px-2 shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              value="Пользователь"
              readOnly
            />
          </fieldset>
          <fieldset className="flex w-full items-center justify-between gap-8">
            <label
              className="text-base-content w-16 text-left font-semibold"
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              className="text-primary-content focus:shadow-primary-content inline-flex h-8 flex-1 grow items-center justify-center rounded px-2 shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="password"
              value="1234"
              readOnly
            />
          </fieldset>
          <div className="flex w-full justify-end">
            <Dialog.Close asChild>
              <button
                onClick={onLogin}
                className="bg-primary text-primary-content hover:bg-primary-content hover:text-primary focus-visible:outline-primary-content inline-flex h-10 items-center justify-center rounded px-4 font-semibold focus-visible:outline-2"
              >
                Войти
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-primary-content bg-base-200 hover:bg-base-300 focus-visible:outline-primary-content absolute top-2 right-2 inline-flex size-12 items-center justify-center rounded-full focus-visible:outline-2"
              aria-label="Close"
            >
              <XMarkIcon className="size-8" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { UserButton };
