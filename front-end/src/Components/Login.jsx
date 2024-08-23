import React, { useRef, useState } from "react";
import logoImage from "../assets/images/Logo.png";
import Button from "./Ui/Button";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EyeIcon from "../assets/EyeIcon";
import EyeOffIcon from "../assets/EyeOffIcon";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../store/slices/user";
import { setUserId } from "../store/slices/user";

const urlRegister = "http://localhost:3001/users/";
const urlLogin = "http://localhost:3001/auth/login";

export default function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);

  const [focusedInput, setFocusedInput] = useState(null);

  const [showLogin, setShowLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msgErrorName, setMsgErrorName] = useState("");
  const [msgErrorEmail, setMsgErrorEmail] = useState("");
  const [msgErrorPassword, setMsgErrorPassword] = useState("");

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const handleInputClick = (inputRef) => {
    inputRef.current.focus();
  };

  const handleFocus = (inputId) => {
    setFocusedInput(inputId);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const onIniciarSesion = () => {
    setShowLogin(true);
    setMsgErrorEmail("");
  };

  const onRegister = () => {
    setShowLogin(false);
    setMsgErrorEmail("");
  };

  const onNameChange = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const nameValidation = () => {
    let result = false;
    if (name.length === 0) {
      result = true;
      setMsgErrorName("Agrega un nombre");
    } else if (name.length > 0 && name.length <= 100) {
      result = false;
      setMsgErrorName("");
    } else {
      result = true;
      setMsgErrorName("El nombre debe contener como máximo 100 carácteres!");
    }

    return result;
  };

  const emailValidation = () => {
    let result = false;
    const rgExp = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (rgExp.test(email)) {
      setMsgErrorEmail("");
      result = false;
    } else if (email === "") {
      setMsgErrorEmail("Ingrese un correo");
      result = true;
    } else if (!rgExp.test(email)) {
      setMsgErrorEmail("Ingrese un correo valido");
      result = true;
    } else {
      setMsgErrorEmail("");
      result = false;
    }

    return result;
  };

  const passwordValidation = () => {
    setMsgErrorPassword("");
    let result = false;
    let msg = "";

    const rgExp =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,15}$/;

    if (rgExp.test(password)) {
      setMsgErrorPassword("");
      result = false;
      return result;
    } else {
      if (password.length === 0) {
        msg = "El campo no puede estar vacío, agrega una contraseña";
        setMsgErrorPassword(msg);
        result = true;
      } else {
        msg = "La contraseña debe:\n";
        if (password.length < 8) {
          msg += "Contener minimo 8 carácteres.\n";
          result = true;
        }
        if (password.length > 15) {
          msg += "Contener maximo 15 carácteres.\n";
          result = true;
        }
        if (!/(?=.*?[A-Z])/.test(password)) {
          msg += "Contener al menos una letra mayúscula.\n";
          result = true;
        }
        if (!/(?=.*?[a-z])/.test(password)) {
          msg += "Contener al menos una letra minúscula.\n";
          result = true;
        }
        if (!/(?=.*?[0-9])/.test(password)) {
          msg += "Contener al menos un número.\n";
          result = true;
        }
        if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
          msg += "Contener al menos un carácter especial (#?!@$%^&*-)";
          result = true;
        }

        setMsgErrorPassword(msg);
      }
    }

    return result;
  };

  const onEmailChange = (e) => {
    let emailLowerCase = e.target.value.toLowerCase();
    setEmail(emailLowerCase);
    console.log(emailLowerCase);
  };

  const sendInfoLogin = async (e, email, password) => {
    e.preventDefault();
    const wrongEmail = emailValidation();
    const wrongPassword = passwordValidation();

    if (!wrongEmail && !wrongPassword) {
      await axios({
        method: "post",
        url: urlLogin,
        data: { email: `${email}`, password: `${password}` },
      })
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            sessionStorage.setItem("token", response.data.token);
            dispatch(setToken(response.data.token));
            dispatch(setUserId(response.data.userId));
            window.dispatchEvent(new Event("storage"));
            navigate("/", { replace: true });
          } else {
            setMsgErrorPassword("An error ocurred");
          }
          setLoggedIn(true);
          //setNewUser(newUser);
        })
        .catch((error) => {
          console.error(error.response);
          // console.log(error.response.data.message);
          console.log(error.message);

          setMsgErrorPassword("Email o password incorrecto!");
        });

      setEmail("");
      setPassword("");
    }
  };
  const createUser = async (newUser) => {
    axios({
      method: "post",
      url: urlRegister,
      data: newUser,
    })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        if (response.data.token) {
          sessionStorage.setItem("token", response.data.token);
          window.dispatchEvent(new Event("storage"));
          navigate("/", { replace: true });
        } else {
          setMsgErrorPassword("An error ocurred");
        }
        setLoggedIn(true);
        //setNewUser(newUser);
      })
      .catch((error) => {
        console.error(error.response);
        // console.log(error.response.data.message);
        console.log(error.message);
        if (error.response.status === 409) {
          setMsgErrorPassword("El correo ya se encuentra registrado!");
        } else {
          alert("Error creando el usuario, intenta nuevamente");
        }
      });
    setName("");
    setEmail("");
    setPassword("");
  };

  const sendInfoRegister = async (e) => {
    e.preventDefault();

    const wrongName = nameValidation();
    const wrongEmail = emailValidation();
    const wrongPassword = passwordValidation();

    if (!wrongName && !wrongEmail && !wrongPassword) {
      console.log("Puedes Registrar el usuario");
      //Codigo del request
      await createUser({
        name: `${name}`,
        email: `${email}`,
        password: `${password}`,
      });
    } else {
      // setMsgErrorPassword("Error creando el usuario, Intenta nuevamente");
    }
  };

  return (
    <div className="h-screen flex justify-center">
      <div className="principal w-full h-full flex flex-col items-center justify-center lg:max-w-[100%] lg:flex-row p-2">
        <div className="seccion1 flex flex-col items-center justify-center p-5 lg:w-[50%] lg:h-full lg:gap-10">
          <div className="div_logo">
            <img className="logo" src={logoImage} alt="logo" />
          </div>

          <div className="hidden lg:flex flex-col justify-center lg:w-[100%] gap-5">
            <p className="font-plus-jakarta text-5xl font-medium text-[#582B1C] text-center">
              {showLogin
                ? "¿Todavía no tienes una cuenta?"
                : "Si ya tienes una cuenta"}
            </p>
            <p className="font-plus-jakarta text-3xl font-normal text-[#582B1C] text-center">
              {showLogin
                ? "Regístrate para crear una vaca con tus amigos"
                : "Solo has click en el botón para  Iniciar sesión"}
            </p>
          </div>

          <div className="hidden lg:flex flex-col justify-center  lg:p-5 lg:w-[200px]">
            {showLogin ? (
              <Button
                text="Registro"
                disabled={false}
                funcion={() => onRegister()}
              />
            ) : (
              <Button
                text="Iniciar sesión"
                disabled={false}
                funcion={() => onIniciarSesion()}
              />
            )}
          </div>
        </div>
        <div className="seccion2 h-[50%] lg:w-[50%] lg:h-full lg:bg-[#1E1E1E] lg:flex lg:justify-center ">
          {showLogin ? (
            <form
              onSubmit={(e) => sendInfoLogin(e, email, password)}
              className="w-full max-w-[520px] px-2 h-full flex flex-col justify-start items-center gap-5 lg:max-w-[420px] lg:justify-center lg:gap-10"
            >
              <p className="font-medium text-[#7B4343] text-2xl text-center lg:text-4xl lg:text-white">
                Iniciar Sesión
              </p>

              <div className="login w-full flex flex-col content-center gap-2 lg:gap-10 ">
                <div
                  className={`border-2 ${
                    focusedInput === 1 ? "border-green-500" : "border-black"
                  } rounded-md input-Container w-full flex justify-between p-1 px-2 lg:bg-white`}
                >
                  <input
                    onClick={() => handleInputClick(input1Ref)}
                    onFocus={() => handleFocus(1)}
                    onBlur={handleBlur}
                    ref={input1Ref}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    placeholder="Correo"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => onEmailChange(e)}
                  />
                  <svg
                    width="24"
                    height="27"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8L8.44992 11.6333C9.73295 12.4886 10.3745 12.9163 11.0678 13.0825C11.6806 13.2293 12.3194 13.2293 12.9322 13.0825C13.6255 12.9163 14.2671 12.4886 15.5501 11.6333L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
                      stroke="#292D32"
                    />
                  </svg>
                </div>
                {msgErrorEmail !== "" ? (
                  <p className="text-red-600 text-base">{msgErrorEmail}</p>
                ) : null}
                <div
                  className={`flex justify-between items-center border-2 ${
                    focusedInput === 2 ? "border-green-500" : "border-black"
                  } rounded-md input-Container w-full flex justify-between p-1 px-2 lg:bg-white`}
                >
                  <input
                    onClick={() => handleInputClick(input2Ref)}
                    onFocus={() => handleFocus(2)}
                    onBlur={handleBlur}
                    ref={input2Ref}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type={visible1 ? "text" : "password"}
                    placeholder="*********"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => onPasswordChange(e)}
                  />
                  <div className="" onClick={() => setVisible1(!visible1)}>
                    {visible1 ? <EyeIcon /> : <EyeOffIcon />}
                  </div>
                </div>
                {msgErrorPassword !== "" ? (
                  <p className="text-red-600 text-base">{msgErrorPassword}</p>
                ) : null}
              </div>
              <div className="w-full flex flex-col justify-center lg:w-[70%]">
                <Button text="Ingresar" disabled={false} type={"submit"} />
              </div>
              <div className="w-full flex flex-col justify-center  lg:hidden">
                <Button
                  text="Registrarme"
                  disabled={false}
                  funcion={() => onRegister()}
                />
              </div>
              <div className="parrafo olvideCotraseña">
                <a href="/" className="recuperarClave lg:text-white">
                  Olvidé mi contraseña,quiero recuperarla
                </a>
              </div>
            </form>
          ) : (
            <form
              onSubmit={(e) => sendInfoRegister(e)}
              className="w-full max-w-[520px] px-2 h-full flex flex-col justify-start items-center  lg:max-w-[420px] lg:justify-center gap-2 lg:gap-10"
            >
              <p className="font-medium text-[#7B4343] text-2xl text-center lg:text-4xl lg:text-white ">
                Registro
              </p>

              <div className="login w-full flex flex-col content-center gap-2 lg:gap-10 ">
                <div
                  className={`border-2 ${
                    focusedInput === 1 ? "border-green-500" : "border-black"
                  } rounded-md input-Container w-full flex justify-between p-1 px-2 lg:bg-white`}
                >
                  <input
                    onClick={() => handleInputClick(input1Ref)}
                    onFocus={() => handleFocus(1)}
                    onBlur={handleBlur}
                    ref={input1Ref}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => onNameChange(e)}
                  />
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                      stroke="#292D32"
                    />
                    <path
                      d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26003 15 3.41003 18.13 3.41003 22"
                      stroke="#292D32"
                    />
                  </svg>
                </div>
                {msgErrorName !== "" ? (
                  <p className="text-red-600 text-base">{msgErrorName}</p>
                ) : null}
                <div
                  className={`border-2 ${
                    focusedInput === 2 ? "border-green-500" : "border-black"
                  } rounded-md input-Container w-full flex justify-between p-1 px-2 lg:bg-white`}
                >
                  <input
                    onClick={() => handleInputClick(input2Ref)}
                    onFocus={() => handleFocus(2)}
                    onBlur={handleBlur}
                    ref={input2Ref}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="email"
                    placeholder="Correo"
                    name="email"
                    id="email"
                    onChange={(e) => onEmailChange(e)}
                    value={email}
                  />
                  <svg
                    width="24"
                    height="27"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8L8.44992 11.6333C9.73295 12.4886 10.3745 12.9163 11.0678 13.0825C11.6806 13.2293 12.3194 13.2293 12.9322 13.0825C13.6255 12.9163 14.2671 12.4886 15.5501 11.6333L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
                      stroke="#292D32"
                    />
                  </svg>
                </div>
                {msgErrorEmail !== "" ? (
                  <p className="text-red-600 text-base">{msgErrorEmail}</p>
                ) : null}
                <div
                  className={`border-2 ${
                    focusedInput === 3 ? "border-green-500" : "border-black"
                  } rounded-md input-Container w-full flex justify-between p-1 px-2 lg:bg-white`}
                >
                  <input
                    onClick={() => handleInputClick(input3Ref)}
                    onFocus={() => handleFocus(3)}
                    onBlur={handleBlur}
                    ref={input3Ref}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type={visible2 ? "text" : "password"}
                    placeholder="*********"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => onPasswordChange(e)}
                  />
                  <div className="" onClick={() => setVisible2(!visible2)}>
                    {visible2 ? <EyeIcon /> : <EyeOffIcon />}
                  </div>
                </div>
                {msgErrorPassword !== "" ? (
                  <p className="text-red-600 text-base mt-2 whitespace-pre-line">
                    {msgErrorPassword}
                  </p>
                ) : null}
              </div>
              <div className="w-full flex flex-col justify-center lg:w-[70%]">
                <Button text="Registrarme" disabled={false} type={"submit"} />
              </div>
              <div className="w-full flex flex-col justify-center  lg:hidden">
                <Button
                  text="Iniciar Sesión"
                  disabled={false}
                  funcion={() => onIniciarSesion()}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
