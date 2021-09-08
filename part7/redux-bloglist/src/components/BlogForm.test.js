import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const title = component.container.querySelector("#blogTitle");
  const author = component.container.querySelector("#blogAuthor");
  const url = component.container.querySelector("#blogUrl");
  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "testing of forms could be easier" },
  });
  fireEvent.change(author, {
    target: { value: "big horse" },
  });
  fireEvent.change(url, {
    target: { value: "http://www.test.com/2212" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    "testing of forms could be easier"
  );
  expect(createBlog.mock.calls[0][0].author).toBe("big horse");
  expect(createBlog.mock.calls[0][0].url).toBe("http://www.test.com/2212");
});
