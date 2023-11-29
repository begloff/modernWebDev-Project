import React, { useState } from "react";
import "../Register/Register.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from "@mui/icons-material/Lock";
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className="form-groupReg">
        <TextField
          type="text"
          className="form-controlReg"
          label="Your first name"
          id="first-name-input"
          value={user.firstName}
          onChange={onChange}
          name="firstName"
          required
          sx={{
            backgroundColor: "aliceblue",
            width: "95%",
          }}
          InputProps={{
            style: { fontSize: "150%" },
            startAdornment: (
              <InputAdornment position="start" sx={{ width: "5%" }}>
                <BadgeOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="form-groupReg">
        <TextField
          type="text"
          className="form-controlReg"
          label="Your last name"
          id="last-name-input"
          value={user.lastName}
          onChange={onChange}
          name="lastName"
          required
          sx={{
            backgroundColor: "aliceblue",
            width: "95%",
          }}
          InputProps={{
            style: { fontSize: "150%" },
            startAdornment: (
              <InputAdornment position="start" sx={{ width: "5%" }}>
                <BadgeTwoToneIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="form-groupReg">
        <TextField
          type="email"
          className="form-controlReg"
          label="Your email"
          id="email-input"
          value={user.email}
          onChange={onChange}
          name="email"
          required
          sx={{
            backgroundColor: "aliceblue",
            width: "95%",
          }}
          InputProps={{
            style: { fontSize: "150%" },
            startAdornment: (
              <InputAdornment position="start" sx={{ width: "5%" }}>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="form-groupReg">
        <TextField
          type={showPassword ? "text" : "password"}
          className="form-controlReg"
          label="Your password"
          id="password-input"
          value={user.password}
          onChange={onChange}
          name="password"
          min="0"
          required
          sx={{
            backgroundColor: "aliceblue",
            width: "95%",
          }}
          InputProps={{
            sx: { fontSize: "150%" },
            startAdornment: (
              <InputAdornment position="start" sx={{ width: "5%" }}>
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <VisibilityIcon onClick={() => setShowPassword(false)} />
                ) : (
                  <VisibilityOffIcon onClick={() => setShowPassword(true)} />
                )}
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="form-groupReg">
        <Button
          type="submit"
          variant="contained"
          onSubmit={onSubmit}
          sx={{
            backgroundColor: "green",
            fontSize: "140%",
            width: "80%",
            fontFamily: "Tahoma",
            textTransform: "none",
          }}
        >
          Register account
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
