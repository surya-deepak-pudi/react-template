import { rest } from "msw"
import { fetch_users_mock } from "./mockResponses"

export const handlers = [
    rest.get("@testing-library/jest-dom", (req, res, ctx) =>
        res(ctx.json(fetch_users_mock))
    ),
]
