import React from 'react';
import { ObjectTree } from 'react-object-tree';

let value = {
  array1: [{
    name: "name1",
    value: "value1",
  }, {
    name: "name2",
    value: "value2",
  }, {
    name: "name3",
    value: "value3",
  }],
  number1: 123,
  object1: {
    prop1: "value1",
    prop2: true,
    prop3: [1, 2, 3]
  },
  bool1: false,
  null1: null,
};
React.render(<ObjectTree value={ value } />, document.getElementById('root'));
