import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveAuthor(author) {
  return (
    fetch(baseUrl + author.id || ""),
    {
      method: author.id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(author),
    }
  );
}

export function deleteAuthor(authodId) {
  return fetch(baseUrl + authodId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
