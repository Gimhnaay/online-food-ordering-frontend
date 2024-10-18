//Action.js


import {api} from "../../Config/api";
import{
    CREATE_CATEGORY_FAILURE,
    GET_ALL_RESTAURANTS_REQUEST,
    GET_ALL_RESTAURANTS_SUCCESS,
    GET_ALL_RESTAURANTS_FAILURE,
    GET_RESTAURANT_BY_ID_REQUEST,
    GET_RESTAURANT_BY_ID_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST,
    GET_RESTAURANT_BY_USER_ID_SUCCESS,
    GET_RESTAURANT_BY_USER_ID_FAILURE,
    CREATE_RESTAURANT_REQUEST,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_REQUEST,
    UPDATE_RESTAURANT_STATUS_SUCCESS,
    UPDATE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_SUCCESS,
    DELETE_RESTAURANT_REQUEST,
    DELETE_RESTAURANT_SUCCESS,
    DELETE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST,
    CREATE_EVENTS_REQUEST,
    CREATE_EVENTS_SUCCESS,
    GET_ALL_EVENTS_REQUEST,
    GET_ALL_EVENTS_FAILURE,
    GET_ALL_EVENTS_SUCCESS,
    DELETE_EVENTS_REQUEST,
    DELETE_EVENTS_SUCCESS,
    DELETE_EVENTS_FAILURE,
    GET_RESTAURANT_EVENTS_REQUEST,
    GET_RESTAURANT_EVENTS_SUCCESS,
    GET_RESTAURANT_EVENTS_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    GET_RESTAURANT_CATEGORY_REQUEST,
    GET_RESTAURANT_CATEGORY_SUCCESS,
    GET_RESTAURANT_CATEGORY_FAILURE,
    CREATE_EVENTS_FAILURE,
    UPDATE_RESTAURANT_STATUS_FAILURE

}from "./ActionTypes";

export const getAllRestaurantsAction = (token) => {
    return async (dispatch) => {
        dispatch({type:GET_ALL_RESTAURANTS_REQUEST});
        try{
            const {data} = await api.get(`api/restaurant`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({type:GET_ALL_RESTAURANTS_SUCCESS,payload:data});
            console.log("all restaurant ",data);
        } catch(error){
            console.log("catch error",error)
            dispatch({type:GET_ALL_RESTAURANTS_FAILURE,payload:error})
            
        }
    }
}

// export const getAllRestaurantsAction = (token) => {
//     return async (dispatch) => {
//         dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });

//         try {
//             // Log token to check if it's correctly passed
//             console.log("JWT Token: ", token);

//             const { data } = await api.get("/api/restaurant", {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
//             console.log("All restaurants: ", data);
//         } catch (error) {
//             // Improved error logging
//             console.log("Error response: ", error.response ? error.response.data : error.message);

//             dispatch({
//                 type: GET_ALL_RESTAURANTS_FAILURE,
//                 payload: error.response ? error.response.data : "Unknown error",
//             });
//         }
//     };
// };




export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
        dispatch({type:GET_RESTAURANT_BY_ID_REQUEST});
        try{
            const response = await api.get(`api/restaurant/${reqData.restaurantId}`,{
                headers:{
                    Authorization:`Bearer ${reqData.jwt}`
                },
            });
            dispatch({type:GET_RESTAURANT_BY_ID_SUCCESS,payload:response.data});    
        } catch(error){
            console.log("error",error)
            dispatch({type:GET_RESTAURANT_BY_ID_FAILURE,payload:error});
            
        }
    }
}

export const getRestaurantByUserId=(jwt)=>{
    return async (dispatch)=>{
        dispatch({type:GET_RESTAURANT_BY_USER_ID_REQUEST});

        try{
            const {data}= await api.get(`/api/admin/restaurant/user`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            });
            console.log("get restaurant by user id", data);
            dispatch({type:GET_RESTAURANT_BY_USER_ID_SUCCESS,payload:data});
        }catch(error){
            console.log("catch error ",error);
            dispatch({
                type:GET_RESTAURANT_BY_USER_ID_FAILURE,
                payload:error.message,
            });
        }
    };
};

export const createRestaurant = (reqData)=>{
    console.log("token---------", reqData.token);
    return async (dispatch)=>{
        dispatch({type:CREATE_RESTAURANT_REQUEST});
        try{
            const {data} = await api.post('/api/admin/restaurant',reqData.data,{
                headers:{
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({type:CREATE_RESTAURANT_SUCCESS, payload:data});
            console.log("created restaurant ",data);
        } catch(error){
            console.log("catch error ", error);
            dispatch({type:CREATE_RESTAURANT_FAILURE, payload: error})
        }
    }
};

export const updateRestaurant = ({restaurantId, restaurantData,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:UPDATE_RESTAURANT_REQUEST});

        try{
            const res = await api.put(
                `api/admin/restaurant/${restaurantId}`,
                restaurantData,
                {
                    headers: {
                        Authorization:`Bearer ${jwt}`,
                    },
                }
            );
            dispatch({type:UPDATE_RESTAURANT_SUCCESS,payload:res.data});
        } catch(error){
            dispatch({type:UPDATE_RESTAURANT_FAILURE,payload:error})
        }
    };
};
export const deleteRestaurant = ({restaurantId, jwt})=>{
    return async (dispatch)=>{
        dispatch({type:DELETE_RESTAURANT_REQUEST});

        try{
            const res= await api.delete(`/api/admin/restaurant/${restaurantId}`,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                },
            });
           console.log("detele restaurant ", res.data);
           dispatch({type:DELETE_RESTAURANT_SUCCESS,payload:restaurantId}); 
        } catch(error){
            console.log("catch error ", error);
            dispatch({DELETE_RESTAURANT_FAILURE,payload:error});
        }
    };
}
export const updateRestaurantStaus=({restaurantId,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:UPDATE_RESTAURANT_STATUS_REQUEST});

        try{
            const res = await api.put(
                `api/admin/restaurant/${restaurantId}/status`,
                {},
                {
                    headers:{
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("resssss ", res.data);
            dispatch({type:UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data});
        } catch(error){
            console.log("error ",error)
            dispatch({type:UPDATE_RESTAURANT_STATUS_FAILURE, payload: error})
        }
    };
}

export const createEventAction = ({data, jwt, restaurantId})=> {
    return async (dispatch) => {
        dispatch ({type:CREATE_EVENTS_REQUEST});

        try{
            const res = await api.post(
                `api/admin/events/restaurant/${restaurantId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("create events ", res.data);
            dispatch({type:CREATE_EVENTS_SUCCESS,payload: res.data})
        } catch(error){
            console.log("catch - ", error);
            dispatch({type:CREATE_EVENTS_FAILURE,payload: error});
        }
    };

};



export const getAllEvents = ({jwt})=> {
    return async (dispatch) => {
        dispatch({type:GET_ALL_EVENTS_REQUEST});

        try{
            const res = await api.get(`api/events`,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("get all events ", res.data);
            dispatch({type:GET_ALL_EVENTS_SUCCESS,payload: res.data});
        }catch(error){
            dispatch({type:GET_ALL_EVENTS_FAILURE, payload: error})
        }
    };
};



export const deleteEventAction = ({eventId, jwt}) => {
    return async (dispatch) => {
        dispatch({type:DELETE_EVENTS_REQUEST});

        try {
            const res = await api.delete(`api/admin/events/${eventId}`,{
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("DELETE events ", res.data);
            dispatch({type:DELETE_EVENTS_SUCCESS,payload: eventId});
        } catch (error){
            console.log("catch - ", error);
            dispatch({type:DELETE_EVENTS_FAILURE,payload: error});            
        }
    };
};

export const getRestaurantsEvents = ({restaurantId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: GET_RESTAURANT_EVENTS_REQUEST});

        try{
            const res = await api.get(
                `/api/admin/events/restaurant/${restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("get restaurant event ", res.data);
            dispatch({type:GET_RESTAURANT_EVENTS_SUCCESS, payload: res.data});

        } catch(error){
            dispatch({type:GET_RESTAURANT_EVENTS_FAILURE, payload: error});
        }
    };
};


export const createCategoryAction = ({reqData,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:CREATE_CATEGORY_REQUEST});

        try{
            const res = await api.post(`api/admin/category`, reqData,{
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("create category ", res.data);
            dispatch({type:CREATE_CATEGORY_SUCCESS, payload:res.data});
        } catch(error){
            console.log("catch - ", error);
            dispatch({type:CREATE_CATEGORY_FAILURE,payload:error});
        }
    };
};

export const getRestaurantsCategory = ({jwt,restaurantId})=>{
    return async (dispatch) => {
        dispatch({type:GET_RESTAURANT_CATEGORY_REQUEST});
        try{
            const res = await api.get(`/api/category/restaurant/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            
            console.log("get restaurant category ",res.data);
            dispatch({type:GET_RESTAURANT_CATEGORY_SUCCESS, payload: res.data});

        }catch(error){
            console.log("catch error ", error)
            dispatch({type:GET_RESTAURANT_CATEGORY_FAILURE,payload:error});
        }
    };
};

