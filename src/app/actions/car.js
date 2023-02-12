import {
    GET_CARS_PAGE_COUNT_REQUEST,
    GET_CARS_PAGE_COUNT_SUCCESS,
    GET_CARS_PAGE_REQUEST,
    GET_CARS_PAGE_SUCCESS,
    GET_CAR_REQUEST,
    GET_CAR_SUCCESS,
    DELETE_CAR_REQUEST,
    DELETE_CAR_SUCCESS,
    ERROR_GET_CARS_PAGE_COUNT,
    ERROR_GET_CARS_PAGE,
    ERROR_GET_CAR,

    ERROR_DELETE_CAR,
} from '../constants/actionTypes';
const getCarPageRequest = () => ({type: GET_CARS_PAGE_REQUEST});
const getCarPageCountRequest = () => ({type: GET_CARS_PAGE_COUNT_REQUEST});
const getCarRequest = () => ({type: GET_CAR_REQUEST});
const deleteCarRequest = () => ({type: DELETE_CAR_REQUEST});
const getCarPageCountSuccess = pageCount => ({pageCount, type: GET_CARS_PAGE_COUNT_SUCCESS});
const getCarPageSuccess = carList => ({carList, type: GET_CARS_PAGE_SUCCESS});
const getCarSuccess = searchCar => ({searchCar, type: GET_CAR_SUCCESS});
const deleteCarSuccess = () => ({type: DELETE_CAR_SUCCESS});
const errorGetCarPageCount = error => ({error, type: ERROR_GET_CARS_PAGE_COUNT});
const errorGetCarPage = error => ({error, type: ERROR_GET_CARS_PAGE});
const errorGetCar = error => ({error, type: ERROR_GET_CAR});
const errorDeleteCar = error => ({error, type: ERROR_DELETE_CAR});

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

const deleteCar = (carId, selectedPage) => {
    return (dispatch) => {
        dispatch(deleteCarRequest())
        fetch(basicUrl + "/delete/" + carId, {
            method: "DELETE",
        })
            .then(() => {
                dispatch(deleteCarSuccess());
                dispatch(fetchCarPageCount());
                dispatch(fetchCarPage({page: selectedPage}));
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
    fetchCarPage,
    deleteCar,
}