//react imports
import React from "react"
//testing imports
import {
    fireEvent,
    getByText,
    render,
    screen,
    waitFor,
} from "@testing-library/react"
import renderer from "react-test-renderer"
import { rest } from "msw"
//testing helper imports
import { testServer } from "Mocks/testServer"
import { fetch_users_mock } from "Mocks/mockResponses"
//component file imports
import Users from "../index"
import * as useFetchUsers from "../data/useFetchUsers"

//sample users list
const users = [
    {
        id: 1,
        email: "george.bluth@reqres.in",
        first_name: "George",
        last_name: "Bluth",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
    },
    {
        id: 2,
        email: "janet.weaver@reqres.in",
        first_name: "Janet",
        last_name: "Weaver",
        avatar: "https://reqres.in/img/faces/2-image.jpg",
    },
    {
        id: 3,
        email: "emma.wong@reqres.in",
        first_name: "Emma",
        last_name: "Wong",
        avatar: "https://reqres.in/img/faces/3-image.jpg",
    },
    {
        id: 4,
        email: "eve.holt@reqres.in",
        first_name: "Eve",
        last_name: "Holt",
        avatar: "https://reqres.in/img/faces/4-image.jpg",
    },
    {
        id: 5,
        email: "charles.morris@reqres.in",
        first_name: "Charles",
        last_name: "Morris",
        avatar: "https://reqres.in/img/faces/5-image.jpg",
    },
    {
        id: 6,
        email: "tracey.ramos@reqres.in",
        first_name: "Tracey",
        last_name: "Ramos",
        avatar: "https://reqres.in/img/faces/6-image.jpg",
    },
]

//test suite for users page
describe("Testing the Users Screen", () => {
    // fetch test example
    it("Should render the title of the page", () => {
        render(<Users></Users>)
        const title = screen.queryByTestId("user-title")
        expect(title).toBeInTheDocument()
        expect(getByText(title, "Users")).toBeTruthy()
    })
    //fire-event example
    it("Should render the fetch button", () => {
        render(<Users></Users>)
        const button = screen.queryByTestId("user-fetch-button")
        expect(button).toBeInTheDocument()
        fireEvent.click(button)
    })
    //spy on example if ur using external function mocking
    it("Should show loading screen", async () => {
        jest.spyOn(useFetchUsers, "default").mockReturnValue({
            usersLoading: true,
            fetchUser: jest.fn(() => {}),
        })
        render(<Users></Users>)
        await waitFor(() => {
            const loader = screen.queryByTestId("user-loader-container")
            expect(loader).toBeInTheDocument()
        })
    })
    it("Should show error screen", async () => {
        jest.spyOn(useFetchUsers, "default").mockReturnValue({
            usersError: true,
            fetchUser: jest.fn(() => {}),
        })
        render(<Users></Users>)
        await waitFor(() => {
            const error = screen.queryByTestId("user-error")
            expect(error).toBeInTheDocument()
        })
    })
    it("Should show users screen", async () => {
        jest.spyOn(useFetchUsers, "default").mockReturnValue({
            users,
            fetchUser: jest.fn(() => {}),
        })
        render(<Users></Users>)
        await waitFor(() => {
            const list = screen.queryByTestId("user-list")
            expect(list).toBeInTheDocument()
        })
    })
    //test server example when a call happens internally
    it("Should show users screen with test server", async () => {
        testServer.use(
            rest.get("http://localhost/api/users", (req, res, ctx) => {
                return res(ctx.json(fetch_users_mock))
            })
        )
        render(<Users></Users>)
        await waitFor(() => {
            const list = screen.queryByTestId("user-list")
            expect(list).toBeInTheDocument()
        })
    })
    //snapshot testing example
    it("Should render users list with snapshot", () => {
        jest.spyOn(useFetchUsers, "default").mockReturnValue({
            users,
            fetchUser: jest.fn(() => {}),
        })
        const tree = renderer.create(<Users></Users>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
