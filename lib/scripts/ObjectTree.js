'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _typeName = require('type-name');

var _typeName2 = _interopRequireDefault(_typeName);

var ObjectNode = (function (_React$Component) {
  _inherits(ObjectNode, _React$Component);

  function ObjectNode(props) {
    _classCallCheck(this, ObjectNode);

    _get(Object.getPrototypeOf(ObjectNode.prototype), 'constructor', this).call(this, props);
    this.state = { opened: false };
  }

  _createClass(ObjectNode, [{
    key: 'toggleNode',
    value: function toggleNode(e) {
      this.setState({ opened: !this.state.opened });
    }
  }, {
    key: 'render',
    value: function render() {
      var value = this.props.value;

      var type = (0, _typeName2['default'])(value);
      return (/^(Array|Object)$/.test(type) ? this.renderObject(value, type) : /^(number|string|boolean|null)$/.test(type) ? this.renderValue(value, type) : this.renderOther(value, type)
      );
    }
  }, {
    key: 'renderObject',
    value: function renderObject(obj, type) {
      var path = this.props.path;
      var opened = this.state.opened;

      var iter = type === 'Array' ? obj.map(function (v, i) {
        return { prop: i, value: v };
      }) : Object.keys(obj).map(function (prop) {
        return { prop: prop, value: obj[prop] };
      });
      return _react2['default'].createElement(
        'div',
        { className: 'object-node' },
        _react2['default'].createElement(
          'div',
          { className: 'object-label', onClick: this.toggleNode.bind(this) },
          _react2['default'].createElement('i', { className: (0, _classnames2['default'])('toggle-icon', { opened: opened }) }),
          _react2['default'].createElement(
            'span',
            { className: 'object-type' },
            '(' + type + ')'
          )
        ),
        opened ? _react2['default'].createElement(
          'table',
          null,
          iter.map(function (_ref) {
            var prop = _ref.prop;
            var value = _ref.value;

            var cpath = type === 'Array' ? path + '[' + prop + ']' : path ? path + '.' + prop : prop;
            return _react2['default'].createElement(
              'tr',
              null,
              _react2['default'].createElement(
                'th',
                { className: 'prop-name' },
                prop
              ),
              _react2['default'].createElement(
                'td',
                { className: 'prop-value' },
                _react2['default'].createElement(ObjectNode, { value: value, path: cpath })
              )
            );
          })
        ) : null
      );
    }
  }, {
    key: 'renderValue',
    value: function renderValue(value, type) {
      return _react2['default'].createElement(
        'div',
        { className: 'object-node' },
        _react2['default'].createElement(
          'span',
          { className: (0, _classnames2['default'])('object-value', type) },
          JSON.stringify(value)
        )
      );
    }
  }, {
    key: 'renderOther',
    value: function renderOther(value, type) {
      return _react2['default'].createElement(
        'div',
        { className: 'object-node' },
        _react2['default'].createElement(
          'div',
          { className: 'object-label', onClick: this.toggleNode.bind(this) },
          _react2['default'].createElement(
            'span',
            { className: 'object-type' },
            '(' + type + ')'
          )
        )
      );
    }
  }]);

  return ObjectNode;
})(_react2['default'].Component);

var ObjectTree = (function (_React$Component2) {
  _inherits(ObjectTree, _React$Component2);

  function ObjectTree() {
    _classCallCheck(this, ObjectTree);

    _get(Object.getPrototypeOf(ObjectTree.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ObjectTree, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var value = _props.value;

      return _react2['default'].createElement(
        'div',
        { className: (0, _classnames2['default'])('object-tree', className) },
        _react2['default'].createElement(ObjectNode, { value: value, path: '' })
      );
    }
  }]);

  return ObjectTree;
})(_react2['default'].Component);

exports['default'] = ObjectTree;
module.exports = exports['default'];