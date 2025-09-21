import { CogIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "radix-ui";

import { useUserStore } from "../model";

const UserIcon = () => {
  const { isAuth, login, logout } = useUserStore((state) => state);

  const onPointerDown = () => {
    if (isAuth) {
      logout();
    } else {
      login();
    }
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button onPointerDown={onPointerDown}>
            {isAuth ? (
              <CogIcon className="text-primary size-8" />
            ) : (
              <CogIcon className="text-secondary size-8" />
            )}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="text-base-content bg-base-200 rounded px-4 py-2 select-none"
            sideOffset={6}
          >
            Параметры
            <Tooltip.Arrow className="fill-base-200" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export { UserIcon };
