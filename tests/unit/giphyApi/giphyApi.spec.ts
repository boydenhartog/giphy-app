
import moment from "moment";
import { isValid, getCachedOrInvalidate, searchGifs } from "@/utils/giphyApi";
import exampleRequest from "./exampleRequest.json";

describe("Giphy Api functions", () => {
  describe("isValid()", () => {
    it("isValid should be true when given time is not in the past", () => {
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
  })

  describe("getCachedOrInvalidate()", () => {
    const url = "test";

    afterEach(() => {
      localStorage.removeItem(url);
      localStorage.removeItem(`${url}-validTill`);
    })

    it("should return null if cached request was not found", () => {
      expect(getCachedOrInvalidate("bogusUrl32132")).toBe(null);
    });

    it("should return cached item if valid", () => {
      localStorage.setItem(url, JSON.stringify(exampleRequest));
      localStorage.setItem(
        `${url}-validTill`,
        moment()
          .add("2", "seconds")
          .format()
      ); 

      expect(getCachedOrInvalidate("test")).toEqual(exampleRequest);
    });

    it("should return null if item is found but invalid", () => {
      localStorage.setItem(url, JSON.stringify(exampleRequest));
      localStorage.setItem(
        `${url}-validTill`,
        moment()
          .subtract("2", "seconds")
          .format()
      );

      expect(getCachedOrInvalidate("test")).toEqual(null);
    });
  })

  describe("searchGifs()", () => {

    // it("should return a cached result if request is found in localStorage", async () => {
    //   const url = "https://api.giphy.com/v1/gifs/search?q=bla&api_key=RyWYJB7klgCR9vwKyjyVDz4eAvoMcRIx&limit=12&offset=0";
    //   localStorage.setItem(url, JSON.stringify(exampleRequest));
    //   localStorage.setItem(
    //     `${url}-validTill`,
    //     moment()
    //       .add(3, "minutes")
    //       .format()
    //   ); 

    //   expect(await searchGifs({ query: "bla", limit: 12, offset: 0 })).toEqual(
    //     JSON.stringify(exampleRequest)
    //   );

    //   // Cleanup
    //   localStorage.removeItem(url);
    //   localStorage.removeItem(`${url}-validTill`);
    // })

  });
});

