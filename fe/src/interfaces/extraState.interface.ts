import { SerializedError } from "@reduxjs/toolkit";

interface ExtraState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | SerializedError;
  selectedId: undefined | number;
}

export default ExtraState;
