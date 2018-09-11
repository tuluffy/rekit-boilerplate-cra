// import axios from 'axios';
// import httpAdapter from 'axios/lib/adapters/http';
import { configure } from 'enzyme';
// @ts-ignore
import * as Adapter from 'enzyme-adapter-react-16';

// jest --env=jsdom
// if (typeof document === 'undefined') {
//   require('jsdom-global/register');
// }

configure({ adapter: new Adapter() });