import { mount } from "@vue/test-utils";
import VueRailroadDiagram from "./railroad-diagram";

describe("Component", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(VueRailroadDiagram, {
      propsData: { grammar: [{ type: "terminal", text: "+" }] }
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
