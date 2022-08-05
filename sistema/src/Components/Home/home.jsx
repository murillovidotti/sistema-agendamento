import React from "react";
import { useState } from "react";
import axios from "axios";
import Header from "../Header/index";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  CardActions,
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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

//Customizacão
const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
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
  },
  progress: {
    color: "#000",
    position: "absolute",
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

// Validações do formulario com o Yup
let validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Obrigatório"),
  lastName: Yup.string().required("Obrigatório"),
  email: Yup.string().email("Email invalido").required("Obrigatório"),
  phone: Yup.string()
    .required("Telefone obrigatório")
    .min(9, "Telefone precisa ter no mínimo 9 caracteres"),
});

// useState - Props - useEffect

const Home = () => {
  // Mudança de estado utilizando useState
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const classes = useStyles();

  // Enviar dados para API
  const onSubmit = (values) => {
    // OnSubimit está passando os valores como parametro

    setLoading(true);
    axios
      .post("http://localhost:5000/agendamentos", values) // Criando
      .then((response) => {
        if (response.status === 200) {
          setAlert(true); // Alerta de sucesso
          console.log("response", response.status);
          setLoading(false); // Loading false
          setTimeout(() => {
            setAlert(false);
          }, 4000);
        }
      })
      .catch((error) => {
        console.error(error);
        setAlertError(true);
        setTimeout(() => {
          setAlertError(false);
        }, 4000);
        setLoading(false);
      });
  };
  // Customizando Header
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Grid className={classes.title} item xs={12}>
              <Typography>Informações básicas</Typography>
            </Grid>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, handleChange, handleBlur }) => {
                return (
                  <Form>
                    <CardContent>
                      <Grid item container spacing={1} justify="center">
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="Nome"
                            variant="outlined"
                            name="firstName"
                            value={values.firstName}
                            component={TextField}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="Sobrenome"
                            variant="outlined"
                            name="lastName"
                            component={TextField}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="Email"
                            variant="outlined"
                            name="email"
                            component={TextField}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="Telefone"
                            variant="outlined"
                            name="phone"
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
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              onChange={handleChange}
                              onBlur={handleBlur}
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
                            name="dataInicial"
                            label="Data do agendamento"
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <Horario name="horario" label="Hora do agendamento" />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button
                        className={classes.customButton}
                        // style={{ backgroundColor: "#000" }}
                        disabled={loading}
                        variant="contained"
                        color="primary"
                        type="Submit"
                        fullWidth
                      >
                        Salvar Agendamento
                        {loading ? (
                          <CircularProgress
                            className={classes.progress}
                            size={24}
                          />
                        ) : null}
                      </Button>
                    </CardActions>
                    {alert ? ( //Alerta caso a importacao dos dados para api tenha sido um sucesso
                      <Alert
                        style={{ borderRadius: "10px" }}
                        severity="success"
                      >
                        <AlertTitle>Sucesso</AlertTitle>
                        Agendamento realizado com <strong>sucesso</strong>
                      </Alert>
                    ) : alertError ? ( //Alerta caso a importacao dos dados para api tenha dado algum erro
                      <Alert style={{ borderRadius: "10px" }} severity="error">
                        <AlertTitle>Erro</AlertTitle>
                        Ocorreu um erro ao agendar
                      </Alert>
                    ) : null}
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Home;
