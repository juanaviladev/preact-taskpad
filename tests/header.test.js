import { h } from 'preact';
import Component from '../src/ui/header/header';
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme';

describe('Initial Test of the Component', () => {
	test('Component renders 3 nav items', () => {
		const context = shallow(<Component />);
		expect(context.find('h1').text()).toBe('Preact App');
		expect(context.find('Link').length).toBe(3);
	});
});
