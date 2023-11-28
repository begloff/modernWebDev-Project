import React, { useState } from "react";
import "../Login/Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

const AuthForm = ({ user, onChange, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div>
        <div className="form-group">
          <TextField
            type="email"
            className="form-control"
            label="Your email"
            id="email-input"
            value={user.email}
            onChange={onChange}
            name="email"
            required
            sx={{
                backgroundColor: "aliceblue",
                width: "95%"
              }}
            InputProps={{
              style: {fontSize: "150%"},
              startAdornment: (
                <InputAdornment position="start" sx={{width: "5%"}}>
                  <AccountCircleIcon/>
                </InputAdornment>
              ),
            }}
          />
        </div>{" "}
        <div className="form-group">
        <TextField
          type={showPassword ? "text" : "password"}
          className="form-control"
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
        <div className="form-group">
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
            Sign in
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;