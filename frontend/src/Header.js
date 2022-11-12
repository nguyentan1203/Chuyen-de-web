import { Avatar, Button } from "flowbite-react";
import md5 from "md5";
import React, { useCallback } from "react";
import { LogIn, LogOut } from "react-feather";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessUserState, authState } from "./reducers/authReducer";

export default function Header() {
  const user = useRecoilValue(accessUserState);
  const setAuth = useSetRecoilState(authState);

  const onLogout = useCallback(() => {
    setAuth(null);
  }, [setAuth]);

  return (
    <div className="w-full flex justify-between mb-4">
      <div className="flex flex-wrap items-center gap-2">
        {user && (
          <a
            href="/posts"
            className="flex flex-wrap items-center  gap-2 text-blue-600"
          >
            <Avatar
              img={`https://www.gravatar.com/avatar/${md5(user.Email)}`}
              size="md"
            />
            <span className="font-bold">{user.Email}</span>
          </a>
        )}
      </div>
      <div>
        {user ? (
          <Button onClick={onLogout}>
            <LogOut size={13} className="mr-1" /> Đăng Xuất
          </Button>
        ) : (
          <a href="/sign-in">
            <Button>
              <LogIn size={13} className="mr-1" /> Đăng Nhập
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}

