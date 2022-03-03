import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

export const setupTest = () => {
    configure({ adapter: new Adapter() });
}   