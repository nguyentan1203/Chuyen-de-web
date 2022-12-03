import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import React, { useCallback, useEffect, useState } from "react";
import { Key } from "react-feather";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import apiCaller from "../../core/api";
import { delayLoading } from "../../core/commonFuncs";
import { authState } from "../../reducers/authReducer";

export default function ResetPassword() {
  const { token } = useParams();
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

      const { Password, RePassword } = e.target;

      if (Password.value !== RePassword.value) {
        toast.error("Mật khẩu không khớp. Vui lòng thử lại.");
        return setLoading(false);
      }

      const resetPassword = await apiCaller("reset-password", "POST", {
        data: { Token: token, Password: Password.value },
      })
        .then((res) => res?.results)
        .catch((err) => {
          const { message } = err.response.data;
          if (message === "ERROR_RESET_PASSWORD_FAILED") {
            return toast.error(
              "Đặt lại mật khẩu không thành công. Vui lòng thử lại."
            );
          }
          return toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        })
        .finally(() => setLoading(false));

      if (resetPassword?.data) {
        navigate(`/sign-in`);
        toast.success("Đổi mật khẩu thành công. Vui lòng đăng nhập.");
      }
    },
    [navigate, token]
  );

  return (
    <div className="container mx-auto my-4 mt-8">
      <div className="flex justify-center">
        <div className="sm:w-full md:w-full lg:w-2/5 mx-4">
          <Card>
            <form onSubmit={onSubmit}>
              <h5 className="text-lg text-center font-bold capitalize">
                Đổi mật khẩu
              </h5>
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
                  Đổi Mật Khẩu
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
