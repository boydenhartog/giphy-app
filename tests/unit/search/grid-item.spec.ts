import "@testing-library/jest-dom";
import { shallowMount, mount } from "@vue/test-utils";
import GridItem from "@/screens/search/gridItem.vue";
import {
  mockBigGif,
  mockNormalGif,
  mockHorizontalGif,
  mockVerticalGif,
} from "../../e2e/fixtures/mockGifs";


function shallowMountMockGif(gif: {
  images: {
    original: {
      height: number;
      width: number;
      url: string;
    };
  };
}) {
  const { height, width, url } = gif.images.original;
  const wrapper = shallowMount(GridItem, {
    propsData: {
      height,
      width,
      url,
    },
  });

  return wrapper;
}

describe("Grid item", () => {
  it("has .big css class if width and height > 350", () => {
    const wrapper = shallowMountMockGif(mockBigGif);
    expect(wrapper.get(".big"));
  });

  it("has .horizontal css class if width is more than 1.75x the height", () => {
    const wrapper = shallowMountMockGif(mockHorizontalGif);
    expect(wrapper.get(".horizontal"));
  }); 

  it("has .vertical css class if height is more than 1.5x the width", () => {
    const wrapper = shallowMountMockGif(mockVerticalGif);
    expect(wrapper.get(".vertical"));
  }); 

  it("has no additional css class if width / height >= 1.75 || height / width >= 1.5 || height && width > 350", () => {
    const wrapper = shallowMountMockGif(mockNormalGif);

    expect(wrapper.classes("big")).toBe(false);
    expect(wrapper.classes("horizontal")).toBe(false);
    expect(wrapper.classes("vertical")).toBe(false);
  }); 

  it("imgLoaded is false when mounted", () => {
    const wrapper = shallowMount(GridItem, {
      propsData: {
        height: 500,
        width: 500,
        url:
          "https://giphy-analytics.giphy.com/simple_analytics?response_id=8fb55a60e130c688e8ebbda979af737561914942&event_type=GIF_SEARCH&gif_id=G4Ihli2UThrBS&action_type=SENT",
      },
    });

    expect(wrapper.vm.$data.imgLoaded).toBe(false);
  }); 

  it("imgLoaded is false when <img /> is loaded", () => {
    const wrapper = shallowMount(GridItem, {
      propsData: {
        height: 500,
        width: 500,
        url:
          "https://giphy-analytics.giphy.com/simple_analytics?response_id=8fb55a60e130c688e8ebbda979af737561914942&event_type=GIF_SEARCH&gif_id=G4Ihli2UThrBS&action_type=SENT",
      },
    });

    // ImgLoaded = false when mounted
    expect(wrapper.vm.$data.imgLoaded).toBe(false);

    // Simulate img loaded from <img /> tag
    // "as any" is a workaround, typescript throws error on component methods
    (wrapper.vm as any).onImgLoad();

    // ImgLoaded is true after <img /> trigger .onImgLoad()
    expect(wrapper.vm.$data.imgLoaded).toBe(true);
  }); 
})