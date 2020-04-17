import { shallowMount } from "@vue/test-utils";
import Search from "@/screens/search/index.vue";

const DEFAULT_LIMIT = 12;

describe("Search component", () => {
  describe("Searching for a term", () => {
    it("Should add a searchQuery to the DB when searching", () => {
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
      (wrapper as any).vm.search();
      expect(testMethod).toBeCalled();
    });

    it("Should not add a searchQuery to the DB when searching for the same query but different page", async (done) => {
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

      (wrapper as any).vm.search();
      await wrapper.vm.$nextTick();

      (wrapper as any).vm.changePage(2);
      await wrapper.vm.$nextTick();

      // It should only be called when searching the first time, not when switching page
      expect(testMethod.mock.calls.length).toBe(1);
      done();
    });
  });

  describe("Pagination", () => {
    it("Offset should jump by DEFAULT_LIMIT per page (default offset)", async (done) => {
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

      // Search
      (wrapper as any).vm.search();
      await wrapper.vm.$nextTick();

      // Switch page
      (wrapper as any).vm.changePage(2);
      await wrapper.vm.$nextTick();

      // Should have the default (12) offset
      expect((wrapper as any).vm.offset).toBe(DEFAULT_LIMIT);

      // Change page again
      (wrapper as any).vm.changePage(3);
      await wrapper.vm.$nextTick();

      // Should have the default (12) * 2 offset (for page 2)
      expect((wrapper as any).vm.offset).toBe(DEFAULT_LIMIT * 2);
      done();
    });
  });
});
