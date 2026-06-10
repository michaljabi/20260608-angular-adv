import { appIcons } from './app-icons';

describe('appIcons', () => {
  it('exposes semantic aliases mapped to SVG icon definitions', () => {
    expect(appIcons.plus).toContain('<svg');
    expect(appIcons.basketShopping).toContain('<svg');
  });
});
