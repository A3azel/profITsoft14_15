import React, {useEffect, useState} from 'react';
import {
    tableCellClasses,
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {deleteCar, fetchCarPage, fetchCarPageCount} from "../../../app/actions/car";
import {useHistory} from "react-router-dom";
import Button from "components/Button";
import Pagination from "components/Pagination";
import Paper from "components/Paper";
import Table from "components/Table";
import TableBody from "components/TableBody";
import TableCell from "components/TableCell";
import TableContainer from "components/TableContainer";
import TableHead from "components/TableHead";
import TableRow from "components/TableRow";
import {customStyles} from "../../customStyles";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    background: 'white',
}));

/*const useStyles = makeStyles(theme => ({
    tablePaper: {
        position: "relative",
        margin: '5% 5% 5% 5%',
        padding: '50px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: ".2px 12px 18px rgba(131,153,167,0.6)",
        "&:hover": {
            boxShadow: "0px 24px 36px rgba(131,153,167,0.99)"
        }
    },
}));*/

function AllCars(props) {
    //const classes = useStyles();

    const [state, setState] = useState({});

    const cars = useSelector(state => {
        return state.car.carPage;
    });

    const carsPageCount = useSelector(state => {
        return state.car.pageCount;
    });

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchCarPage({
            page: 1
        }));
        dispatch(fetchCarPageCount());
        setState(prevState => ({
            ...prevState,
        }));
    }, []);

    const handleDelete = (id) => {
        dispatch(deleteCar(id));
        setState(prevState => ({
            ...prevState,
        }));
    }

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        dispatch(fetchCarPage({
            page: value
        }));
    };

    return (
        <Paper sx={customStyles.tablePaper}>
            <Button onClick={() => history.push("/createUpdate")} variant="contained"
                    style={{backgroundColor: "green", marginBottom: "20px"}}>Add</Button>
            <TableContainer sx={{maxHeight: 500}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Car name</StyledTableCell>
                            <StyledTableCell align="right">Brand</StyledTableCell>
                            <StyledTableCell align="right">Car prise</StyledTableCell>
                            <StyledTableCell align="right">Release date</StyledTableCell>
                            <StyledTableCell align="right">Driver ID</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {cars.map((car) => (
                            <StyledTableRow key={car.id}>
                                <StyledTableCell component="th" scope="row">
                                    {car.carName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{car.brand}</StyledTableCell>
                                <StyledTableCell align="right">{car.carPrise}</StyledTableCell>
                                <StyledTableCell align="right">{car.releaseDate}</StyledTableCell>
                                <StyledTableCell align="right">{car.driverId}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="contained" sx={{backgroundColor: "blue"}}
                                            onClick={() => history.push("/createUpdate/" + car.id)}>Update</Button>
                                    <Button variant="contained" sx={{backgroundColor: "red"}}
                                            onClick={() => handleDelete(car.id)}>Delete</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={carsPageCount} color="primary" page={page} onChange={handleChange}/>
        </Paper>
    );
}

export default AllCars;