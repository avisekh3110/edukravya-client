import { AxiosError } from "axios";

export const getServerErrors = (err: AxiosError<any>) => {
  if (err && err.response && err.response.data && err.response.data.message) {
    const errString: string[] = err.response.data.message.split(":");
    if (err.response.data.message.includes(":")) errString.shift();
    let errs: string[] = [];
    try {
      errs = JSON.parse(errString[0]);
      console.log(errs);
    } catch {
      errs = [errString[0]];
      console.log(errs);
    }
    return errs;
  }
  return ["There was some problem"];
};
