// Arquivo WeatherDetails.test.js

import { shallowMount } from "@vue/test-utils";
import WeatherDetails from "@/components/WeatherDetails.vue";
import VueRouter from "vue-router";
import axios from "axios";
import VueApexCharts from "vue-apexcharts";

jest.mock("axios");

// Registrando plugins e componentes globalmente no Vue
const Vue = require("vue");
Vue.use(VueRouter);
Vue.component("apexchart", VueApexCharts);

describe("WeatherDetails.vue", () => {
  let wrapper;
  let router;

  beforeEach(() => {
    router = new VueRouter();
    wrapper = shallowMount(WeatherDetails, {
      global: {
        plugins: [VueRouter],
        components: {
          apexchart: VueApexCharts,
        },
      },
      props: {
        cityName: "Maringa",
      },
      propsData: {
        cityName: "Maringa",
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("checks the name of the component", () => {
    expect(wrapper.vm.$options.name).toMatch("WeatherDetails");
  });

  it("calls axios on created", async () => {
    axios.get.mockResolvedValue({ data: {} });
    await wrapper.vm.$options.created[0].call(wrapper.vm);
    expect(axios.get).toBeCalled();
  });

  it("handles axios error on created", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    axios.get.mockRejectedValue(new Error("Test Error"));
    await wrapper.vm.$options.created[0].call(wrapper.vm);
    expect(console.error).toHaveBeenCalledWith("Error fetching weather data:", new Error("Test Error"));
    consoleErrorSpy.mockRestore();
  });
});
