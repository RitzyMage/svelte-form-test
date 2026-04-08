import type { InferSelectModel } from "drizzle-orm";
import type { userData } from "./schema";

export type User = InferSelectModel<typeof userData>