// CityList.spec.ts

import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import CityList from './CityList.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('CityList.vue', () => {
  let wrapper: Wrapper<any>; // Utilize Wrapper<any> ou um tipo mais específico se possível
  let router: VueRouter;

  beforeEach(() => {
    router = new VueRouter();
    wrapper = shallowMount(CityList, {
      localVue,
      router,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('adds a city to the list', () => {
    const newCity = 'Rio de Janeiro';
    wrapper.setData({ newCity });
    wrapper.vm.addCity();

    expect(wrapper.vm.cities).toContainEqual({ name: newCity });
  });

  it('removes a city from the list', () => {
    const cityToRemove = 'Recife';
    wrapper.vm.removeCity(cityToRemove);

    expect(wrapper.vm.cities).not.toContainEqual({ name: cityToRemove });
  });
});
