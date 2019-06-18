import { mount } from "@vue/test-utils";
import VueRailroadDiagram from "./railroad-diagram";

describe("Component", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(VueRailroadDiagram);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
