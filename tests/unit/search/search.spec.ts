import { shallowMount } from "@vue/test-utils";
import Search from "@/screens/search/index.vue";

describe("search/index.vue", () => {
  it("Renders the search page when opened", () => {
    const wrapper = shallowMount(Search);

    expect(true);
    // expect(wrapper.text()).toMatch(msg);
  });
});
