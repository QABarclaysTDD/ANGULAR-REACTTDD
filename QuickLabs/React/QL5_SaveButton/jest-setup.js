import '@testing-library/jest-dom';

// Polyfills for TextEncoder and TextDecoder (needed for React Router DOM)
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;