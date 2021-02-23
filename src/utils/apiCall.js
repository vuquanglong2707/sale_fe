import axios from 'axios';
import * as Config from './Config';

 const callApi = async ({
  endpoint,
  method,
  payload,
  headers,
  params,
 }) => {
     try {
        const result = await axios({
            method,
            url: `${Config.API_URL}/${endpoint}`,
            headers,
            data: payload,
            params
        })
        return {
            response: result,
            error: null,
        }
    } catch (e) {
        return {
        response: null,
        error: e.request,
        }
    }
}

export default  callApi
