import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;

  beforeEach(() => {
    const initialBlog = {
      id: "123456",
      title: "testing title",
      author: "test1",
      url: "http://www.test.com/123",
      likes: 3,
      user: {
        id: "6543210",
        username: "root",
        name: "Superuser",
      },
    };
    component = render(<Blog blog={initialBlog} />);
  });

  test("at start the details are not displayed", () => {
    const div = component.container.querySelector(".details");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, details are displayed", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    const span = component.container.querySelector(".likeSpan");
    expect(span).toHaveTextContent("likes 3");

    const url = component.container.querySelector(".blogUrl");
    expect(url).toHaveTextContent("http://www.test.com/123");
  });
});

describe("Blog component interacting", () => {
  test("clicking like button twice", () => {
    let component;
    const initialBlog = {
      id: "123456",
      title: "testing title",
      author: "test1",
      url: "http://www.test.com/123",
      likes: 3,
      user: {
        id: "6543210",
        username: "root",
        name: "Superuser",
      },
    };
    const mockHandler = jest.fn();
    component = render(<Blog blog={initialBlog} addLikes={mockHandler} />);
    const button = component.getByText("view");
    fireEvent.click(button);
    const likeButton = component.container.querySelector(".likeBtn");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
