import axios from "axios";

export const loginCall = async (userCredential, dispath) => {
        dispath({type:"LOGIN_START"});
        try {
            const res = await axios.post("auth/login", userCredential);
            dispath({type:"LOGIN_SUCCESS", payload:res.data});
        } catch (err) {
            dispath({type:"LOGIN_FAILURE", payload:err});
        }
}