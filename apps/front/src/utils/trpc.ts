import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../../../back/types";

export const trpc = createReactQueryHooks<AppRouter>();
