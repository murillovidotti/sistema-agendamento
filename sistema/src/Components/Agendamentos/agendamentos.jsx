import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Header from "../Header/index";
import { Formik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
import Horario from "../FormsUI/DataTimePicker/hora";
import Data from "../FormsUI/DataTimePicker/data";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "formik-mui";

//Customizacao do display
const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    borderRadius: "10px",
    border: "1px solid #000",
  },
  button: {
    display: "flex",
  },
  title: {
    backgroundColor: "#000",
    borderRadius: "5px",
    color: "#fff",
    textAlign: "center",
  },
  customButton: {
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
    border: "1px solid #000",
    color: "#000",
    borderRadius: "30px",
    marginTop: theme.spacing(1),
  },
  progress: {
    color: "#000",
    position: "absolute",
  },
  cardCcontent: {
    // backgroundColor: "#000",
  },
}));

//Valores iniciais para os valores
const initialValues = {
  firstName: "",
  lastName: "",
  servicos: "",
  phone: "",
  email: "",
  dataInicial: "",
  horario: "",
};

// Lista de opções
const options = [
  { label: "Manicure", value: "manicure" },
  { label: "Cabelo", value: "cabelo" },
  { label: "Pintura", value: "pintura" },
];

// Validações do formulario

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [field, setField] = useState(true);
  const [infoGet, setInfoGet] = useState([]);
  const classes = useStyles();

  const api = axios.create(
    {
      baseURL: "http://localhost:5000",
    },
    []
  );
  useEffect(() => {
    api
      .get("/agendamentos")
      .then((response) => {
        console.log(response);
        setInfoGet(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro : " + err);
      });
  }, []);

  console.log("renderizou");

  const onSubmit = (values) => {
    setField(false);
  };
  //Alinhamento/customizacao dos itens do agendamento
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md">
          {infoGet?.map((info) => (
            <div className={classes.formWrapper}>
              <Grid className={classes.title} item xs={12}>
                <Typography>Informações do Agendamento</Typography>
              </Grid>
              <Formik
                key={info._id}
                initialValues={initialValues}
                onSubmit={onSubmit}
              >
                {({ values, handleChange, handleBlur }) => {
                  return (
                    <Form>
                      <CardContent className={classes.cardCcontent}>
                        <Grid item container spacing={1} justify="center">
                          <Grid item xs={12} sm={6} md={6}>
                            <Field
                              disabled={field}
                              label="Nome"
                              variant="outlined"
                              name="firstName"
                              value={info.firstName}
                              component={TextField}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <Field
                              disabled={field}
                              label="Sobrenome"
                              variant="outlined"
                              name="lastName"
                              value={info.lastName}
                              component={TextField}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <Field
                              disabled={field}
                              label="Email"
                              variant="outlined"
                              name="email"
                              value={info.email}
                              component={TextField}
                              fullWidth
                            />
                          </Grid>

                          <Grid item xs={12} sm={6} md={6}>
                            <Field
                              disabled={field}
                              label="Telefone"
                              variant="outlined"
                              name="phone"
                              value={info.phone}
                              component={TextField}
                              fullWidth
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={12}>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel id="demo-simple-select-outlined-label">
                                Serviço
                              </InputLabel>
                              <Select
                                disabled={field}
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={info.servicos}
                                name="servicos"
                              >
                                {options.map((item) => (
                                  <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={6}>
                            <Data
                              disabled={field}
                              name="dataInicial"
                              label="Data do agendamento"
                              value={info.dataInicial}
                            />
                          </Grid>

                          <Grid item xs={6}>
                            <Horario
                              disabled={field}
                              name="horario"
                              label="Hora do agendamento"
                              value={info.horario}
                            />
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Button
                            className={classes.customButton}
                            disabled={loading}
                            variant="contained"
                            color="primary"
                            type="Submit"
                            fullWidth
                          >
                            Alterar Informações
                            {loading ? (
                              <CircularProgress
                                className={classes.progress}
                                size={24}
                              />
                            ) : null}
                          </Button>
                        </Grid>
                      </CardContent>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          ))}
        </Container>
      </Grid>
    </Grid>
  );
};

export default Home;
