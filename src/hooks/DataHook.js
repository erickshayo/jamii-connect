import axios from "axios";
import { useCallback, useState } from "react";
import { selectCurrentToken } from "../App/AuthSlice";
import { useDispatch, useSelector } from "react-redux";;


export const useToggle = (intitialValue = false) => {
    

    const [state, setState] = useState(intitialValue);

    const toggle = useCallback(() => {
        setState((state) => !state);
    }, []);

    return[state, toggle];
}

export const useDataFetch = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectCurrentToken);

    const fetch = async ({url, response}) => {
        // let response;
        const requestHeader = {
            headers: {
                Authorization: "Bearer "  + token,
                // Authorization: "JWT "  + token,
              }
        }

        try {
            await axios.get(url)
            .then((res) => {

                if(res.status === 200){
                    response = res.data;
                    // message = response.header.responseMessage;
                }
            })
            .catch((error) => {
                throw error.message;
            });
        } catch (error) {
            throw error.message;
        };
                    console.log(response);

        return response;
    }

    return { fetch };
}