import "@testing-library/jest-dom"
import { testServer } from "./src/mocks/testServer"
import { TextEncoder, TextDecoder } from "util"

beforeAll(() => testServer.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => testServer.resetHandlers())
afterAll(() => testServer.close())

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
