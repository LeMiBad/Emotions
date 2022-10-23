import { createStore } from "effector";

export const $uuid = createStore<string | null>(null);
