import React from "react";

export default function ErrroMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p>This is required</p>;
      case "minLength":
        return <p>Your password too short</p>;
      case "maxLength":
        return <p>Your password too long</p>;
      case "pattern":
        return <p>Enter a valid email address</p>;
      case "validate":
        return <p>Username is already used</p>;
      default:
        return null;
    }
  }

  return null;
}
