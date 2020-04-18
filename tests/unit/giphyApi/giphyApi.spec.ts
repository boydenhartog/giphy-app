import axios from "axios";
import moment from "moment";
import { isValid, getCachedOrInvalidate, searchGifs } from "@/utils/giphyApi";
import exampleResponse from "./exampleResponse.json";
const { VUE_APP_GIPHY_BASE_URL, VUE_APP_GIPHY_API_KEY } = process.env;

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Giphy Api functions", () => {
  describe("isValid()", () => {
    it("isValid should be true when given time is in the future", () => {
      const testTime = moment()
        .add(2, "minutes")
        .format();

      expect(isValid(testTime)).toBe(true);
    });

    it("isValid should be false when given time is in the past", () => {
      const testTime = moment()
        .subtract(2, "minutes")
        .format();

      expect(isValid(testTime)).toBe(false);
    });
  });

  describe("getCachedOrInvalidate()", () => {
    const url = "test";

    afterEach(() => {
      localStorage.removeItem(url);
      localStorage.removeItem(`${url}-validTill`);
    });

    it("should return null if cached request was not found", () => {
      expect(getCachedOrInvalidate("bogusUrl32132")).toBe(null);
    });

    it("should return cached item if valid", () => {
      // Add response to localStorage
      localStorage.setItem(url, JSON.stringify(exampleResponse));
      localStorage.setItem(
        `${url}-validTill`,
        moment()
          .add("2", "seconds")
          .format()
      );

      // function finds response in cache
      expect(getCachedOrInvalidate("test")).toEqual(exampleResponse);
    });

    it("should return null if item is found but invalid", () => {
      // Set outdated item in storage
      localStorage.setItem(url, JSON.stringify(exampleResponse));
      localStorage.setItem(
        `${url}-validTill`,
        moment()
          .subtract("2", "seconds")
          .format()
      );

      // returns null because it's invalid
      expect(getCachedOrInvalidate("test")).toEqual(null);
    });
  });

  describe("searchGifs()", () => {
    const query = "frontend bastards";
    const limit = 12;
    const offset = 0;
    const url = `${VUE_APP_GIPHY_BASE_URL}/gifs/search?q=${query}&api_key=${VUE_APP_GIPHY_API_KEY}&limit=${limit}&offset=${offset}"`;

    beforeEach(() => {
      mockedAxios.get.mockResolvedValue(exampleResponse);
    });

    afterEach(() => {
      localStorage.removeItem(url);
      localStorage.removeItem(`${url}-validTill`);
    });

    it("should return cached response if valid", async () => {
      // Add the response to storage
      localStorage.setItem(url, JSON.stringify(exampleResponse.data));
      localStorage.setItem(
        `${url}-validTill`,
        moment()
          .add("3", "minutes")
          .format()
      );

      const res = await searchGifs({
        query: "frontend bastards",
        limit: 12,
        offset: 0,
      });

      // Should return the cached response
      expect(res).toEqual(exampleResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledTimes(0);
    });

    it("should return api response", async () => {
      const res = await searchGifs({
        query: "something else",
        limit: 12,
        offset: 0,
      });

      // Should return response from API
      expect(res).toEqual(exampleResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it("should throw an error on bad request", async () => {
      const error = new Error("Invalid API Key");
      mockedAxios.get.mockImplementationOnce(() => Promise.reject(error));

      const res = searchGifs({
        query: "bla",
        limit: 12,
        offset: 0,
      });

      await expect(res).rejects.toThrow(error);
    });
  });
});
