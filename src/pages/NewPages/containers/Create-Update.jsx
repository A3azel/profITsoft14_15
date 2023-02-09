import React, {useEffect, useState} from 'react';
import {Grid, InputLabel, Paper, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {fetchCar, updateCar, addCar} from "../../../app/actions/car";
import CustomTitle from "../../../components/CustomTitle/CustomTitle";
import ErrorLabel from "../../../components/CustomErrorLable/ErrorLabel";
import {customStyles} from "./customStyles";
import SubmitButton from "components/SubmitButton";
import BeckButton from "../../../components/BeckButton";
import Button from "../../../components/Button";


function CreateUpdateCar(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const initialState = {
        carName: "",
        brand: "",
        carPrise: "",
        releaseDate: "",
        driverId: ""
    }

    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState({});

    const {carName, brand, carPrise, releaseDate, driverId} = state;

    const {id} = useParams();

    const searchCar = useSelector(state => {
        return state.car.searchCar;
    });

    useEffect(() => {
        if (searchCar && id) {
            setState({
                ...searchCar,
            });
        }
    }, [searchCar]);


    useEffect(() => {
        if(id){
            dispatch(fetchCar({id: id}));
        }
    }, []);

    const handleChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        state.carPrise = Number(state.carPrise).toFixed(2);
        state.releaseDate = new Date(state.releaseDate);
        state.driverId = Number(state.driverId);
        let errors = validate(state);
        setErrors(errors);

        if(Object.keys(errors).length === 0 && id!==undefined){
            dispatch(updateCar(state, Number(id)));
            history.push("/allCars");
            return;
        }
        if(Object.keys(errors).length === 0 && id===undefined){
            dispatch(addCar(state));
            history.push("/allCars");
        }
    }

    const validate = (values) => {
        const errors = {};
        if(values.carName.length<2 || values.carName.length>256){
            errors.carName = "Length must be from 2 to 256 characters";
        }
        if(values.brand.length<2 || values.brand.length>64){
            errors.brand = "Length must be from 2 to 64 characters";
        }
        if(values.carPrise=='NaN'){
            errors.carPrise = "Not valid value";
        }else {
            if(Number(values.carPrise)<=0){
                errors.carPrise = "The price cannot be negative or zero";
            }
        }
        if(values.releaseDate=='Invalid Date'){
            errors.releaseDate = "This field can't be blank";
        }else{
            if(new Date(values.releaseDate).getTime()>new Date().getTime()){
                errors.releaseDate = "Not valid date";
            }
        }
        if(!values.driverId){
            errors.driverId = "This field can't be blank";
        }
        return errors;
    }

    return (
        <div>
            <Paper sx={customStyles.paper}>
                <CustomTitle title={id ? "Update car" : "Add car"}/>
                <form>
                    <Grid container>
                        <Grid item xs={6}>
                            <InputLabel
                                shrink htmlFor="Car name"
                                sx={customStyles.labelStyles}
                            >
                                Car name
                            </InputLabel>
                            <TextField
                                id={"carName"}
                                type={"text"}
                                placeholder="Car name"
                                name={"carName"}
                                sx={errors.carName ? customStyles.errorFieldStyles : customStyles.fieldStyles}
                                value={carName}
                                InputLabelProps={{shrink: false}}
                                onChange={handleChange}
                            />
                            <ErrorLabel errorMassage={errors.carName}/>
                            <br/>
                        </Grid>

                        <Grid item xs={6}>
                            <InputLabel
                                shrink htmlFor="Brand"
                                sx={customStyles.labelStyles}
                            >
                                Brand
                            </InputLabel>
                            <TextField
                                id={"brand"}
                                type={"text"}
                                name={"brand"}
                                placeholder="Brand"
                                sx={errors.brand ? customStyles.errorFieldStyles : customStyles.fieldStyles}
                                value={brand}
                                InputLabelProps={{shrink: false}}
                                onChange={handleChange}
                            />
                            <ErrorLabel errorMassage={errors.brand}/>
                            <br/>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel
                                shrink htmlFor="Prise"
                                sx={customStyles.labelStyles}
                            >
                                Prise
                            </InputLabel>
                            <TextField
                                id={"prise"}
                                type={"text"}
                                name={"carPrise"}
                                placeholder="Prise"
                                value={carPrise}
                                sx={errors.carPrise ? customStyles.errorFieldStyles : customStyles.fieldStyles}
                                InputLabelProps={{shrink: false}}
                                onChange={handleChange}
                            />
                            <ErrorLabel errorMassage={errors.carPrise}/>
                            <br/>
                        </Grid>

                        <Grid item xs={6}>
                            <InputLabel
                                shrink htmlFor="Release date"
                                sx={customStyles.labelStyles}
                            >
                                Release date
                            </InputLabel>
                            <TextField
                                id={"releaseDate"}
                                type={"date"}
                                name={"releaseDate"}
                                placeholder="Release date"
                                value={releaseDate}
                                sx={errors.releaseDate ? customStyles.errorFieldStyles : customStyles.fieldStyles}
                                InputLabelProps={{shrink: false}}
                                onChange={handleChange}
                            />
                            <ErrorLabel errorMassage={errors.releaseDate}/>
                            <br/>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel
                                shrink htmlFor="Driver ID"
                                sx={customStyles.labelStyles}
                            >
                                Driver ID
                            </InputLabel>
                            <TextField
                                id={"driverID"}
                                type={"number"}
                                name={"driverId"}
                                placeholder="Driver ID"
                                value={driverId}
                                sx={errors.driverId ? customStyles.errorFieldStyles : customStyles.fieldStyles}
                                InputLabelProps={{shrink: false}}
                                onChange={handleChange}
                            />
                            <ErrorLabel errorMassage={errors.driverID}/>
                            <br/>
                        </Grid>
                    </Grid>
                </form>
                <SubmitButton
                    onClick={handleSubmit}
                    buttonText={id ? 'Оновити' : 'Додати'}
                >
                </SubmitButton>
                <br/>
                {/*<BeckButton
                    onClick={() => history.push("/allCars")}
                    buttonText={'Назад'}
                >
                </BeckButton>*/}
                <Button
                    onClick={() => history.push("/allCars")}
                    type={"submit"}
                    variant="contained"
                    sx={customStyles.beckButton}
                >
                    Назад
                </Button>
            </Paper>
        </div>
    );
}

export default CreateUpdateCar;