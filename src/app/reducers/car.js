const initialState = {
    isLoading: false,
    carPage: [],
    searchCar: {},
    carID: "",
    pageCount:"",
    errors: "",
};
export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CARS_PAGE_REQUEST':
        case 'GET_CAR_REQUEST':
        case 'DELETE_CAR_REQUEST': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'GET_CARS_PAGE_COUNT_SUCCESS':{
            const {
                pageCount,
            } = action;
            return {
                ...state,
                isLoading: false,
                pageCount: pageCount,
                errors: "",
            };
        }
        case 'GET_CAR_SUCCESS':{
            const {
                searchCar,
            } = action;
            return {
                ...state,
                isLoading: false,
                searchCar: searchCar,
                errors: "",
            };
        }
        case 'GET_CARS_PAGE_SUCCESS': {
            const {
                carList,
            } = action;
            return {
                ...state,
                isLoading: false,
                carPage: carList,
                errors: "",
            };
        }
        case 'DELETE_CAR_SUCCESS': {
            return {
                ...state,
                errors: "",
            };
        }
        case 'ERROR_GET_CARS_PAGE_COUNT':
        case 'ERROR_GET_CARS_PAGE':
        case 'ERROR_GET_CAR':
        case 'ERROR_DELETE_CAR': {
            const {
                error,
            } = action;
            return {
                ...state,
                isLoading: true,
                errors: error,
            };
        }
        default: return state;
    }
};