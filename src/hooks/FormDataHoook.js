import { useState } from "react"
import { selectCurrentToken } from "../App/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export const useFormManager =  (initialState) => {
    const [formState, setFormState] = useState(initialState);

    const changeHandler = (event) => {
        setFormState({
            ...formState,
            [event.target.name] : event.target.value
        })
    }

    const elementChangeHandler = (name, value) => {
        setFormState({
            ...formState,
            [name] : value
        })
    }

    const reset = () => setFormState(initialState);

    return { changeHandler, elementChangeHandler, reset, formState };
}


export const useFormPost = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectCurrentToken);

    const post = async ({url, response, data, login=false}) => {

        const requestHeader = {
            headers: {
                Authorization: "Bearer "  + token,
                // Authorization: "Token "  + token,
              }

        }

        const requestBody = {

            data: data,
            // userId: userId
        }
        const request = {
            body: requestBody
        }

        let message = "";
        let severity = "info";

        try {
            await axios.post(url, data)
            .then((res) => {
                if(res.status === 200){
                    response = res.data;
                    severity = response.header.responseStatus;
                    message = response.header.responseMessage;
                }
            })
            .catch((error) => {
                // throw error.message;
            });
        } catch (error) {
            // throw error.message;
        }


        return response;
    }

    const put = async ({url, response, data}) => {

        const requestHeader = {
            headers: {
                Authorization: "JWT "  + token,
                // Authorization: "Token "  + token,
              }

        }

        try {
            await axios.put(url, data, requestHeader)
            .then((res) => {
                console.log(res);
                if(res.status === 200){
                    response = res.data;

                }
            })
            .catch((error) => {
                 throw error.message;
            });
        } catch (error) {
            throw error.message;
        }


        return response;
    }

    const deleteRequest = async ({url, response, data}) => {

        const requestHeader = {
            headers: {
                Authorization: "JWT "  + token,
                // Authorization: "Token "  + token,
              }

        }
        console.log(requestHeader);

        let message = "";
        let severity = "info";

        try {
            await axios.delete(url, requestHeader)
            .then((res) => {
                console.log(res);
                if(res.status === 200){
                    response = res.data;
                    severity = response.header.responseStatus;
                    message = response.header.responseMessage;
                }
            })
            .catch((error) => {
                throw error.message;
            });
        } catch (error) {
            throw error.message;
        }

        return response;
    }

    return { post, put , deleteRequest}
 }