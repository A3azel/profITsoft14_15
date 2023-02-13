import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Link from 'components/Link';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import {Container} from "@material-ui/core";

const getClasses = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Initial = ({
  authorities,
}) => {
  const classes = getClasses();
  const {
    availableItems,
  } = useSelector(({ reducer })=> reducer);
  const canSeeList = useAccessValidate({
    ownedAuthorities: authorities,
    neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ'],
  });

  return (
      <div className={classes.container}>
          {canSeeList ?
              <Container>
              <Typography sx={{
                  textAlign:"center",
                  fontSize: 36,
                  marginBottom: 2,
                  fontFamily: 'Bold',
              }}>
                  Car information
              </Typography>
              <Link href={"/allCars"}>
                  All cars
              </Link>
          </Container> : null
          }
        {!canSeeList && (
            <Typography>
              Не могу ничего показать :(
            </Typography>
        )}
      </div>
  )
};



export default Initial;
