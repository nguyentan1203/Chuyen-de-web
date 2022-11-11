import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import React, { useCallback, useEffect, useState } from "react";
import { Key, User } from "react-feather";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import apiCaller from "../../core/api";
import { delayLoading } from "../../core/commonFuncs";
import { authState } from "../../reducers/authReducer";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setLoading(true);
      await delayLoading();

      const { Email, Password, RePassword } = e.target;

      if (Password.value !== RePassword.value) {
        toast.error("Mật khẩu không khớp. Vui lòng thử lại.");
        return setLoading(false);
      }

      const signUp = await apiCaller("sign-up", "POST", {
        data: { Email: Email.value, Password: Password.value },
      })
        .then((res) => res?.results)
        .catch((err) => {
          const { message } = err.response.data;
          if (message === "ERROR_SIGN_UP_EXISTED") {
            return toast.error("Tài khoản đã tồn tại. Vui lòng đăng nhập.");
          }
          return toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        })
        .finally(() => setLoading(false));

      if (signUp?.data) {
        navigate(`/sign-in`);
        toast.success("Đăng ký thành công. Vui lòng đăng nhập.");
      }
    },
    [navigate]
  );

  return (
    <div className="container mx-auto my-4 mt-8">
      <div className="flex justify-center">
        <div className="sm:w-full md:w-full lg:w-2/5 mx-4">
          <Card>
            <form onSubmit={onSubmit}>
              <h5 className="text-lg text-center font-bold capitalize">
                Đăng ký
              </h5>
              <div className="text-base mb-1 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                type="email"
                name="Email"
                required={true}
                addon={<User size={15} />}
                placeholder="Email"
              />
              <div className="text-base mt-2 my-1 block">
                <Label htmlFor="password" value="Mật khẩu" />
              </div>
              <TextInput
                type="password"
                name="Password"
                required={true}
                addon={<Key size={15} />}
                placeholder="Mật khẩu"
              />
              <div className="text-base mt-2 mb-1 block">
                <Label htmlFor="password" value="Nhập lại mật khẩu" />
              </div>
              <TextInput
                type="password"
                name="RePassword"
                required={true}
                addon={<Key size={15} />}
                placeholder="Mật khẩu xác nhận"
              />
              <div className="flex items-center gap-2 mt-3">
                <Label htmlFor="agree">
                  Bằng cách nhấn nút đăng ký bạn đồng ý với{" "}
                  <a
                    href="/forms"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    điều khoản và điều kiện
                  </a>{" "}
                  của chúng tôi.
                </Label>
              </div>
              <div className="w-full mt-3">
                <Button
                  type="submit"
                  className="capitalize"
                  style={{ width: "100%" }}
                >
                  {loading && (
                    <div className="mr-3">
                      <Spinner size="sm" light={true} />
                    </div>
                  )}
                  Đăng Ký
                </Button>
              </div>
              <p className="text-sm mt-2">
                Bạn đã có tài khoản? Hãy{" "}
                <Link to="/sign-in" className="text-blue-600">
                  đăng nhập
                </Link>
                .
              </p>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
