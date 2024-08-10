import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />)
  expect(screen.getByPlaceholderText(/user name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();  
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />)
  expect(screen.getByRole("checkbox",{ name: /Volunteer/i })).toBeInTheDocument();
  expect(screen.getByRole("checkbox",{ name: /Reading/i })).toBeInTheDocument();
  expect(screen.getByRole("checkbox",{ name: /Public Speaking/i })).toBeInTheDocument();
  expect(screen.getAllByRole("checkbox").length).toBe(3);
});

test("the checkboxes are initially unchecked", () => {
  render(<App />)
  expect(screen.getByRole("checkbox",{ name: /Volunteer/i })).not.toBeChecked();
  expect(screen.getByRole("checkbox",{ name: /Reading/i })).not.toBeChecked();
  expect(screen.getByRole("checkbox",{ name: /Public Speaking/i })).not.toBeChecked();
});

test("checkbox appears as checked when user clicks it", () => {
  render(<App />);
  const volunteer = screen.getByRole("checkbox",{ name: /Volunteer/i });
  const reading = screen.getByRole("checkbox",{ name: /Reading/i });
  const publicSpeaking = screen.getByRole("checkbox",{ name: /Public Speaking/i });

  userEvent.click(volunteer);
  expect(volunteer).toBeChecked();

  userEvent.click(reading);
  expect(reading).toBeChecked();

  userEvent.click(publicSpeaking);
  expect(publicSpeaking).toBeChecked();
});


// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />)

  const username = screen.getByPlaceholderText(/user name/i);
  const mail = screen.getByPlaceholderText(/email address/i);

  userEvent.type(username, 'Imelda Hope');
  expect(username).toHaveValue('Imelda Hope');

  userEvent.type(mail, 'ihope.mail@co');
  expect(mail).toHaveValue('ihope.mail@co');

});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  const volunteer = screen.getByRole("checkbox",{ name: /Volunteer/i });
  const reading = screen.getByRole("checkbox",{ name: /Reading/i });
  const publicSpeaking = screen.getByRole("checkbox",{ name: /Public Speaking/i });

  userEvent.click(volunteer);
  expect(volunteer).toBeChecked();

  userEvent.click(reading);
  expect(reading).toBeChecked();

  userEvent.click(publicSpeaking);
  expect(publicSpeaking).toBeChecked();

  userEvent.click(volunteer);
  expect(volunteer).not.toBeChecked();

  userEvent.click(reading);
  expect(reading).not.toBeChecked();

  userEvent.click(publicSpeaking);
  expect(publicSpeaking).not.toBeChecked();  
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: /Submit/i }));
  expect(screen.getByText(/Your form has been submitted/i)).toBeInTheDocument();
});
