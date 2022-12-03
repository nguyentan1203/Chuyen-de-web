import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { User } from "react-feather";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import apiCaller from "../../core/api";
import { delayLoading } from "../../core/commonFuncs";
import { authState } from "../../reducers/authReducer";

const CAPTCHA_SITE_KEY = process.env.REACT_APP_CAPTCHA_SITE_KEY || "";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);

  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (auth) {
      navigate("/");
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

      const { Email } = e.target;

      const forgotPassword = await apiCaller("forgot-password", "POST", {
        data: { Email: Email.value },
      })
        .then((res) => res?.results)
        .catch(() => toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau."))
        .finally(() => setLoading(false));

      if (forgotPassword?.data) {
        navigate(`/sign-in`);
        toast.success("Gửi yêu cầu quên mật khẩu thành công.");
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
                Quên mật khẩu
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
                  Quên Mật Khẩu
                </Button>
              </div>
              <p className="text-sm mt-2">
                Bạn chưa đã tài khoản? Hãy{" "}
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
