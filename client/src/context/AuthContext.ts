import { createContext } from "react";
import type { AuthBody } from "../types";

export const userContext = createContext<AuthBody | undefined>(undefined);

