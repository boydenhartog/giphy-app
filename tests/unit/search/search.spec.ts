import Vue from "vue";
import Buefy from "buefy";
Vue.use(Buefy, { defaultIconComponent: "vue-fontawesome" });

import { shallowMount } from "@vue/test-utils";
import Search from "@/screens/search/index.vue";

describe("Search component", () => {
  describe("searching for a term", () => {
    it("should add a searchQuery to the DB when searching", () => {
      const testMethod = jest.fn();
      const wrapper = shallowMount(Search, {
        stubs: {
          bField: { template: '<div class="stubbed" />' },
          bInput: { template: '<div class="stubbed" />' },
          bModal: { template: '<div class="stubbed" />' },
        },
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

    it("should not add a searchQuery to the DB when searching for the same query but different page", async () => {
      const testMethod = jest.fn();
      const wrapper = shallowMount(Search, {
        stubs: {
          bField: { template: '<div class="stubbed" />' },
          bInput: { template: '<div class="stubbed" />' },
          bModal: { template: '<div class="stubbed" />' },
          bMessage: { template: '<div class="stubbed" />' },
        },
        methods: {
          createSearchTerm: testMethod,
        },
        data() {
          return {
            query: "crazygif",
          };
        },
      });

      await (wrapper as any).vm.search();
      // await Vue.nextTick();
      await (wrapper as any).vm.changePage(2);
      // await Vue.nextTick();

      // It should only be called when searching the first time, not when switching page
      expect(testMethod.mock.calls.length).toBe(1);
    });

    it("offset should jump by 12 per page (hardcoded offset)", async () => {
      const testMethod = jest.fn();
      const wrapper = shallowMount(Search, {
        stubs: {
          bField: { template: '<div class="stubbed" />' },
          bInput: { template: '<div class="stubbed" />' },
          bModal: { template: '<div class="stubbed" />' },
        },
        methods: {
          createSearchTerm: testMethod,
        },
        data() {
          return {
            query: "crazygif",
          };
        },
      });

      // Search and switch page
      (wrapper as any).vm.search();
      // await Vue.nextTick();
      (wrapper as any).vm.changePage(2);

      expect((wrapper as any).vm.offset).toBe(12);
      
      // Change page again
      // await Vue.nextTick();
      (wrapper as any).vm.changePage(3);
      
      expect((wrapper as any).vm.offset).toBe(24);
    });
  });
});
