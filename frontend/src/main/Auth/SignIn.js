import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Key, User } from "react-feather";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import apiCaller from "../../core/api";
import { delayLoading } from "../../core/commonFuncs";
import { authState } from "../../reducers/authReducer";

const CAPTCHA_SITE_KEY = process.env.REACT_APP_CAPTCHA_SITE_KEY || "";

export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);

  const auth = useRecoilValue(authState);
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    if (auth) {
      navigate("/posts/create");
    }
  }, [auth, navigate]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const recaptcha = recaptchaRef?.current?.getValue();
      if (!recaptcha) {
        toast.error("Vui lòng xác nhận bạn không phải là robot.");
        return;
      }

      setLoading(true);
      await delayLoading();

      const { Email, Password } = e.target;

      const signIn = await apiCaller("sign-in", "POST", {
        data: { Email: Email.value, Password: Password.value },
      })
        .then((res) => res?.results)
        .catch((err) => {
          const { message } = err.response.data;
          if (message === "ERROR_SIGN_IN_FAILED") {
            return toast.error("Tài khoản hoặc mật khẩu không chính xác.");
          }
          return toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        })
        .finally(() => setLoading(false));

      if (signIn?.data) {
        setAuth(signIn?.data);
        navigate(`/`);
        toast.success("Đăng nhập thành công.");
      }
    },
    [navigate, setAuth]
  );

  return (
    <div className="container mx-auto my-4 mt-8">
      <div className="flex justify-center">
        <div className="sm:w-full md:w-full lg:w-2/5 mx-4">
          <Card>
            <form onSubmit={onSubmit}>
              <h5 className="text-lg text-center font-bold capitalize">
                Đăng nhập
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
              <div className="mt-1">
                <Label htmlFor="agree">
                  <Link
                    to="/forgot-password"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Quên mật khẩu?
                  </Link>
                </Label>
              </div>
              <div className="mt-3">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="normal"
                  sitekey={CAPTCHA_SITE_KEY}
                />
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
                  Đăng Nhập
                </Button>
              </div>
              <p className="text-sm mt-2">
                Bạn chưa có tài khoản? Hãy{" "}
                <Link to="/sign-up" className="text-blue-600">
                  đăng ký
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
