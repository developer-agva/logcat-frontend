import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { loginWithEmail } from "../../store/action/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShowPassword from "../../assets/images/ShowPassword.png";
import HidePassword from "../../assets/images/HidePassword.png";
import { validateEmailHelper } from "../../helper/Emails";
import SpinnerCustom from "../../container/SpinnerCustom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import loginImg from "../../assets/images/loginImg.jpg";
import Style from '../../css/Login.module.css'
const cookies = new Cookies();

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: localStorage.getItem("rememberemail"),
    passwordHash: localStorage.getItem("rememberpassword"),
  });
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [setErrorPassword, setSetErrorPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // const
  const [isRemeberMe, setisRemeberMe] = useState();
  const handleRememberPasswordChange = (e) => {
    setisRemeberMe(e.target.checked);
  };

  const dispatch = useDispatch();
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { loading, error, adminInfo } = adminLoginReducer;
  const navigate = useNavigate();
  // VALIDATE EMAIL
  const validateEmail = (email) => {
    const isEmailValid = validateEmailHelper(email);
    if (isEmailValid.isSuccess) {
      setLoginForm({
        ...loginForm,
        email,
      });

      return isEmailValid.isSuccess;
    }
    if (!isEmailValid.isSuccess && !isEmailValid.isEmail) {
      setEmailError(isEmailValid.message);
      return isEmailValid.isSuccess;
    }
    if (!isEmailValid.isSuccess && isEmailValid.isEmail) {
      setEmailError(isEmailValid.message);
      return isEmailValid.isSuccess;
    }
    setEmailError(null);
    return true;
  };

  // PASSWORD VALIDATE
  const validatePassword = (passwordHash) => {
    if (!passwordHash) {
      setPasswordError("Please enter your passwordHash.");
      return false;
    }

    setLoginForm({
      ...loginForm,
      passwordHash: passwordHash,
    });
    setPasswordError(null);
    return true;
  };

  // HANDLE SUBMIT AND DISPATCH
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = validateEmail(loginForm.email);
    const passwordHash = validatePassword(loginForm.passwordHash);

    if (email && passwordHash) {
      dispatch(loginWithEmail(loginForm.email, loginForm.passwordHash));
    }
    if (isRemeberMe) {
      localStorage.setItem("rememberemail", loginForm.email.toLowerCase());
      localStorage.setItem("rememberpassword", loginForm.passwordHash);
      localStorage.setItem("rememberMe", isRemeberMe);
    } else {
      localStorage.setItem("rememberemail", "");
      localStorage.setItem("rememberpassword", "");
      localStorage.setItem("rememberMe", false);
    }
  };

  useEffect(() => {
    if (cookies.get("ddAdminToken")) {
      if (adminInfo.data.userType === "Super-Admin") {
        navigate("/adminDashboard");
      } else if (adminInfo.data.userType === "Production") {
        navigate("/productionModel");
      } else if (adminInfo.data.userType === "Service-Engineer") {
        navigate("/service_eng");
      } else if (adminInfo.data.userType === "Support") {
        navigate("/Support_eng_data_module");
      } else if (adminInfo.data.userType === "Nurse") {
        navigate("/nurse_module");
      } else if (adminInfo.data.userType === "User") {
        navigate("/home");
      } else if (adminInfo.data.userType === "Accounts") {
        navigate("/accountDasboard");
      } else if (adminInfo.data.userType === "Dispatch") {
        navigate("/dispatchDashboardModule");
      } else {
        navigate("/hospitalAdminScreen");
      }
    }
  }, [navigate, adminInfo]);

  useEffect(() => {
    setSetErrorPassword(error);
  }, [error]);
  useEffect(() => {
    const rememberEmail = localStorage.getItem("rememberEmail");
    const rememberPassword = localStorage.getItem("rememberPassword");
    if (isRemeberMe) {
      setLoginForm(rememberEmail);
      setLoginForm(rememberPassword);
      setisRemeberMe(true);
    }
  }, []);
  const userRole = localStorage.getItem("userrole");
  const emailChange = (e) => {};
  return (
    <div className={Style.container}>
      <div style={{ width: "50%" }}>
        <img
        // src="https://logcat-bucket23.s3.ap-south-1.amazonaws.com/unnamed-12.jpg"
          src={loginImg}
          alt="loginImg"
          loading="lazy"
          className={Style.loginImg}
        />
      </div>
      <div
      className={Style.rightContainer}
      >
        <h1 style={{ fontWeight: "400", fontSize: "4rem", color: "grey" }}>
          LOGIN
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <input
            type="text"
            placeholder="Email"
            className={Style.inputField}
            onChange={(e) => {
              setLoginForm({ ...loginForm, email: e.target.value });
            }}
            value={loginForm.email}
          />
          {emailError != null ? (
            <div className="error">
              <small style={{ color: "red" }}>{emailError}</small>
            </div>
          ) : (
            ""
          )}
          <input
            type="text"
            aria-autocomplete="list"
            placeholder="Passwords"
            className={Style.inputField}
            onPaste={(e) => {
              setLoginForm({ ...loginForm, passwordHash: "aL8h%$498h5&29h" });
            }}
            onChange={(e) =>
              setLoginForm({ ...loginForm, passwordHash: e.target.value })
            }
            value={loginForm.passwordHash}
          />
          {passwordError != null ? (
            <div className="error">
              <small style={{ color: "red" }}>{passwordError}</small>
            </div>
          ) : setErrorPassword ? (
            <div className="error">
              <small style={{ color: "red" }}>{setErrorPassword}</small>
            </div>
          ) : (
            ""
          )}
        </div>
        {loginForm?.passwordHash && loginForm?.email ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              checked={isRemeberMe}
              onChange={(e) => handleRememberPasswordChange(e)}
              type="checkbox"
              style={{ width: "1.5rem", height: "1rem", borderRadius: "99px" }}
            />
            <p>Remember me?</p>
          </div>
        ) : (
          ""
        )}
        <Link
          to="/register"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            width: "16rem",
          }}
        >
          <MdKeyboardArrowRight />
          <span>I want to create a AgVa account</span>
        </Link>
        <Link
          to="/forgetPassword"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            width: "12rem",
          }}
        >
          <MdKeyboardArrowRight />
          <span>Forgot your password?</span>
        </Link>
        <div>
          {loading ? (
            <button
            className={Style.submitBtn}
            >
              <SpinnerCustom height="15px" />
            </button>
          ) : (
            <button
              onClick={(e) => handleSubmit(e)}
              className={Style.submitBtn}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
