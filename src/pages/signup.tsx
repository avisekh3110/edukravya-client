import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, Input, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";

interface Data {
  email: string | null;
  username: string | null;
  password: string | null;
}

interface ConfirmPassword {
  confirmPassword: string | null;
  isVisible: boolean;
  confirmisIsVisible: boolean;
}

const getErrors = (data: Data, confirmPassword: ConfirmPassword) => {
  const errs: string[] = [];
  if (data.email != null && !validator.isEmail(data.email + "")) {
    errs.push("Invalid Email");
  }
  if (data.password != null && data.password.trim().length < 8) {
    errs.push("Invalid Password");
  } else if (
    (confirmPassword.confirmPassword != null &&
      confirmPassword.confirmPassword.trim().length < 8) ||
    (confirmPassword.confirmPassword != null &&
      data.password == data.password?.trim() &&
      data.password != confirmPassword.confirmPassword)
  ) {
    errs.push("Password does not match");
  }
  return errs;
};

export default function SignUp() {
  const [data, setData] = useState<Data>({
    email: null,
    username: null,
    password: null,
  });
  const [confirmPassword, setConfirmPassword] = useState<ConfirmPassword>({
    confirmPassword: null,
    isVisible: false,
    confirmisIsVisible: false,
  });
  return (
    <div className="flex py-20 justify-center flex-col h-screen w-full items-center bg-indigo-400 bg-gradient-to-b from-blue-700 to-cyan-400">
      <div className="flex items-center justify-center h-[100%] max-h-fit w-full max-w-4xl min-w-4xl rounded-xl">
        <div
          style={{
            backgroundImage: "url(/images/signblue.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="flex flex-col justify-between h-full w-1/2 py-10 px-4 bg-blue-800 rounded-l-xl select-none"
        >
          <div className="font-black text-white md:text-4xl text-3xl">
            EDUKRAVYA
          </div>
          <div className="flex flex-col px-10 items-end text-white">
            <span className="font-bold md:text-4xl text-3xl">WELCOME PAGE</span>
            <span className="text-lg font-semibold pt-4 pr-8">
              Sign Up to <br /> continue access
            </span>
          </div>
          <div className="text-sm text-blue-300 font-semibold">
            HAVE A GREAT DAY !!
          </div>
        </div>
        <div className="flex gap-10 flex-col pt-14 px-10 h-full w-1/2 bg-white rounded-r-xl">
          <div className="text-4xl font-black cursor-default">Sign Up</div>
          <div className="flex flex-col justify-around h-1/3">
            <Input
              error={data.email != null && !validator.isEmail(data.email + "")}
              onChange={(e) => {
                setData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }));
              }}
              size="small"
              className="px-2 py-2 w-full text-gray-500 bg-white rounded-sm "
              placeholder="Email Address"
            />
            <Input
              error={data.username != null && data.username.trim().length < 8}
              onChange={(e) => {
                setData((prevData) => ({
                  ...prevData,
                  username: e.target.value,
                }));
              }}
              size="small"
              className="px-2 py-2 w-full text-gray-500 bg-white rounded-sm "
              placeholder="Username"
            />
            <Input
              onChange={(e) => {
                setData((prevData) => ({
                  ...prevData,
                  password: e.target.value,
                }));
              }}
              error={data.password != null && data.password.trim().length < 8}
              size="small"
              type={confirmPassword.isVisible ? "text" : "password"}
              className="px-2 py-2.5 text-gray-500 bg-white w-full rounded-sm "
              placeholder="Create Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setConfirmPassword((cp) => ({
                        ...cp,
                        isVisible: !cp.isVisible,
                      }));
                    }}
                    edge="end"
                  >
                    {confirmPassword.isVisible ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Input
              onChange={(e) => {
                setConfirmPassword((prevConfirmPassword) => ({
                  ...prevConfirmPassword,
                  confirmPassword: e.target.value,
                }));
              }}
              error={
                (confirmPassword.confirmPassword != null &&
                  confirmPassword.confirmPassword.trim().length < 8) ||
                (confirmPassword.confirmPassword != null &&
                  data.password == data.password?.trim() &&
                  data.password != confirmPassword.confirmPassword)
              }
              size="small"
              type={confirmPassword.confirmisIsVisible ? "text" : "password"}
              className="px-2 py-2.5 w-full text-gray-500 bg-white rounded-sm text-sm"
              placeholder="Confirm Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setConfirmPassword((cp) => ({
                        ...cp,
                        confirmisIsVisible: !cp.confirmisIsVisible,
                      }));
                    }}
                    edge="end"
                  >
                    {confirmPassword.confirmisIsVisible ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <Button
                onClick={() => {
                  if (!getErrors(data, confirmPassword).length) {
                    console.log(data);
                  } else {
                    console.log(getErrors(data, confirmPassword));
                  }
                }}
                color="success"
                variant="contained"
                className="w-full"
              >
                <div className="text-white">confirm mail</div>
              </Button>
            </div>
            <div className="flex items-center cursor-default">
              <hr className="w-full" />
              <div className="p-2 text-lg">or</div>
              <hr className="w-full" />
            </div>
            <Button color="info" variant="contained" className="w-full">
              <div className="text-white">Continue With Google</div>
            </Button>
            <div className="text-sm text-right select-none">
              already have an account?
              <Link to="/signin" className="pl-1 font-bold cursor-pointer">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
