import axios from "axios";
import { shallowMount } from "@vue/test-utils";
import Search from "@/screens/search/index.vue";
import exampleResponse from "../giphyApi/exampleResponse.json";

const DEFAULT_LIMIT = 12;

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Search component", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue(exampleResponse);
  });

  describe("Searching for a term", () => {
    it("Should add a searchQuery to the DB when searching", async () => {
      const testMethod = jest.fn();
      const wrapper = shallowMount(Search, {
        methods: {
          createSearchTerm: testMethod,
        },
        data() {
          return {
            query: "crazygif",
          };
        },
      });

      // Not a sexy solution but the Vue/Jest/TS combo isn't working optimally
      // Search for "crazygif"
      await (wrapper as any).vm.search();

      expect(testMethod).toBeCalled();
    });

    it("Should not add a searchQuery to the DB when searching for the same query but different page", async () => {
      const testMethod = jest.fn();
      const wrapper = shallowMount(Search, {
        methods: {
          createSearchTerm: testMethod,
        },
        data() {
          return {
            query: "crazygif",
          };
        },
      });

      // Search for "crazygif"
      await (wrapper as any).vm.search();

      // Switch to page 2
      await (wrapper as any).vm.changePage(2);

      // It should only be called when searching the first time, not when switching page
      expect(testMethod.mock.calls.length).toBe(1);
    });
  });

  describe("Pagination", () => {
    it("Offset should jump by DEFAULT_LIMIT per page (default offset)", async () => {
      const testMethod = jest.fn();
      const wrapper = shallowMount(Search, {
        methods: {
          createSearchTerm: testMethod,
        },
        data() {
          return {
            query: "crazygif",
          };
        },
      });

      // Search for "crazygif"
      await (wrapper as any).vm.search();

      // Switch to page 2
      await (wrapper as any).vm.changePage(2);

      // Should have the default (12) offset
      expect((wrapper as any).vm.offset).toBe(DEFAULT_LIMIT);

      // Change to page 3 
      await (wrapper as any).vm.changePage(3);

      // Should have the default (12) * 2 offset (for page 2)
      expect((wrapper as any).vm.offset).toBe(DEFAULT_LIMIT * 2);
    });
  });
});
