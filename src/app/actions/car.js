import {
    GET_CARS_PAGE_COUNT_REQUEST,
    GET_CARS_PAGE_COUNT_SUCCESS,
    GET_CARS_PAGE_REQUEST,
    GET_CARS_PAGE_SUCCESS,
    GET_CAR_REQUEST,
    GET_CAR_SUCCESS,
    SAVE_CAR_REQUEST,
    ADD_CAR_SUCCESS,
    UPDATE_CAR_REQUEST,
    UPDATE_CAR_SUCCESS,
    DELETE_CAR_REQUEST,
    DELETE_CAR_SUCCESS,
    ERROR_GET_CARS_PAGE_COUNT,
    ERROR_GET_CARS_PAGE,
    ERROR_GET_CAR,
    ERROR_ADD_CAR,
    ERROR_UPDATE_CAR,
    ERROR_DELETE_CAR,
} from '../constants/actionTypes';
const getCarPageRequest = () => ({type: GET_CARS_PAGE_REQUEST});
const getCarPageCountRequest = () => ({type: GET_CARS_PAGE_COUNT_REQUEST});
const getCarRequest = () => ({type: GET_CAR_REQUEST});
const addCarRequest = () => ({type: SAVE_CAR_REQUEST});
const updateCarRequest = () => ({type: UPDATE_CAR_REQUEST});
const deleteCarRequest = () => ({type: DELETE_CAR_REQUEST});
const getCarPageCountSuccess = pageCount => ({pageCount, type: GET_CARS_PAGE_COUNT_SUCCESS});
const getCarPageSuccess = carList => ({carList, type: GET_CARS_PAGE_SUCCESS});
const getCarSuccess = searchCar => ({searchCar, type: GET_CAR_SUCCESS});
const addCarSuccess = carID => ({carID, type: ADD_CAR_SUCCESS});
const updateCarSuccess = () => ({type: UPDATE_CAR_SUCCESS});
const deleteCarSuccess = () => ({type: DELETE_CAR_SUCCESS});
const errorGetCarPageCount = (error) => ({error, type: ERROR_GET_CARS_PAGE_COUNT});
const errorGetCarPage = (error) => ({error, type: ERROR_GET_CARS_PAGE});
const errorGetCar = (error) => ({error, type: ERROR_GET_CAR});
const errorAddCar = (error) => ({error, type: ERROR_ADD_CAR});
const errorUpdateCar = (error) => ({error, type: ERROR_UPDATE_CAR});
const errorDeleteCar = (error) => ({error, type: ERROR_DELETE_CAR});

const basicUrl = "http://localhost:8080/api/v1/car";

const getCarPageCount = () => {
    return fetch(basicUrl + "/getPageCount", {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        });
};
const getCarPage = (page) => {
    return fetch(basicUrl + "/all/" + page, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        });
};

const getCar = (id) => {
    return fetch(basicUrl + "/" + id, {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            });
};


const addCar = (carBody) => {
    /*console.console.log('carBody: '+ carBody);
    console.log('JSON: '+ JSON.stringify(carBody));*/
    return (dispatch) => {
        dispatch(addCarRequest())
        fetch(basicUrl + "/create", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carBody),
        })
            .then((response) => {
                dispatch(addCarSuccess(response.json()));
                dispatch(fetchCarPage({page: 1}));
            })
            .catch((error) => {
                dispatch(errorAddCar(error));
            })
    }
};

const updateCar = (carBody, id) => {
    return (dispatch) => {
        dispatch(updateCarRequest())
        fetch(basicUrl + "/update/" + id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carBody),
        })
            .then((response) => {
                dispatch(updateCarSuccess(response.json()));
                dispatch(fetchCarPage({page: 1}));
            })
            .catch((error) => {
                dispatch(errorUpdateCar(error));
            })
    }
};

const deleteCar = (carId) => {
    return (dispatch) => {
        dispatch(deleteCarRequest())
        fetch(basicUrl + "/delete/" + carId, {
            method: "DELETE",
        })
            .then(() => {
                dispatch(deleteCarSuccess());
                dispatch(fetchCarPageCount());
                dispatch(fetchCarPage({page: 1}));
            })
            .catch((error) => {
                dispatch(errorDeleteCar(error));
            })
    }
};

const fetchCarPageCount = () => (dispatch) => {
    dispatch(getCarPageCountRequest());
    return getCarPageCount()
        .then(pageCount => dispatch(getCarPageCountSuccess(pageCount)))
        .catch((error) => dispatch(errorGetCarPageCount(error)));
};

const fetchCarPage = ({page}) => (dispatch) => {
    dispatch(getCarPageRequest());
    return getCarPage(page)
        .then(carList => dispatch(getCarPageSuccess(carList)))
        .catch((error) => dispatch(errorGetCarPage(error)));
};

const fetchCar = ({id}) => (dispatch) => {
    dispatch(getCarRequest());
    return getCar(id)
        .then(searchCar => dispatch(getCarSuccess(searchCar)))
        .catch((error) => dispatch(errorGetCar(error)));
};


export {
    fetchCarPageCount,
    fetchCar,
    addCar,
    updateCar,
    fetchCarPage,
    deleteCar,
}