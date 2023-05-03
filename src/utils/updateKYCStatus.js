/* eslint-disable  */
import { makePostReq } from "./axiosHelper";

export const updateKYVStatus = ({action, userID, remarks}) => {
    if(!remarks) window.alert("remarks can not be empty");
    const body = {
      userID,
      status: action,
      remarks,
    }
    return makePostReq('/v1/user/kyc', JSON.stringify(body))
}