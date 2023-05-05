/* eslint-disable  */
import { makePatchReq } from "./axiosHelper";

export const updateKYVStatus = ({action, userID, remarks}) => {
    if(!remarks && action === "FAILED") return;
    const body = {
      userID,
      status: action,
      remark: [remarks],
    }
    return makePatchReq('/v1/kyc/status', body)
}