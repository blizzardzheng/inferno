//
// import { render } from 'inferno';
// import Component from 'inferno-component';
// import mobx from 'mobx';
// import { innerHTML } from 'inferno/test/utils';
// import { observer } from '../dist-es';
//
// describe('old - MobX Observer', () => {
// 	let container;
// 	const store = {
// 		todos: mobx.observable([ 'one', 'two' ]),
// 		extra: mobx.observable({ test: 'observable!' })
// 	};
//
// 	beforeEach(function () {
// 		container = document.createElement('div');
// 		container.style.display = 'none';
// 		document.body.appendChild(container);
// 	});
//
// 	afterEach(function () {
// 		render(null, container);
// 		document.body.removeChild(container);
// 	});
//
// 	const TodoItem = observer(function ({ todo }) {
// 		return <li>{ todo }</li>;
// 	});
//
// 	let todoListRenderings = 0;
// 	let todoListWillReactCount = 0;
// 	const TodoList = observer(class extends Component {
// 		componentWillReact() {
// 			todoListWillReactCount++;
// 		}
//
// 		render() {
// 			todoListRenderings++;
// 			const todos = store.todos;
// 			return <div>{todos.map((todo) => <TodoItem todo={todo}/>)}</div>;
// 		}
// 	});
//
// 	it('should render a component', () => {
// 		expect(() => render(<TodoList/>, container)).to.not.throw(Error);
// 	});
//
// 	it('should render a todo list', () => {
// 		render(<TodoList/>, container);
// 		expect(container.innerHTML).to.equal(innerHTML('<div><li>one</li><li>two</li></div>'));
// 	});
//
// 	it('should render a todo list with added todo item', () => {
// 		store.todos.push('three');
// 		render(<TodoList/>, container);
// 		expect(container.innerHTML).to.equal(innerHTML('<div><li>one</li><li>two</li><li>three</li></div>'));
// 	});
//
// 	it('should render a todo list with non observable item', () => {
// 		const FlatList = observer(class extends Component {
// 			render({ extra }) {
// 				return <div>{store.todos.map((title) => <li>{ title }{ extra.test }</li>)}</div>;
// 			}
// 		});
//
// 		render(<FlatList extra={ store.extra }/>, container);
// 		store.extra = mobx.toJS({ test: 'XXX' });
// 		render(<FlatList extra={ store.extra }/>, container);
// 		mobx.extendObservable(store, {
// 			test: 'new entry'
// 		});
// 		render(<FlatList extra={ store.extra }/>, container);
// 		expect(container.innerHTML).to.equal(innerHTML('<div><li>oneXXX</li><li>twoXXX</li><li>threeXXX</li></div>'));
// 	});
//
// 	it('should have a shouldComponentUpdate that returns false when appropriate', () => {
// 		const scu = TodoItem.prototype.shouldComponentUpdate;
//
// 		let todoItem = <TodoItem str="test" />;
// 		let str = 'different';
// 		expect(scu.call(todoItem, { str })).to.be.true;
// 		str = 'test';
//
// 		expect(scu.call(todoItem, { str })).to.be.false;
// 		expect(scu.call(todoItem, { str, prop: 'foo' })).to.be.true;
//
// 		const obj = {};
// 		todoItem = <TodoItem obj={obj} />;
// 		expect(scu.call(todoItem, { obj })).to.be.false;
//
// 		const observableObj = mobx.observable({});
// 		todoItem = <TodoItem observableObj={observableObj} />;
// 		expect(scu.call(todoItem, { observableObj })).to.be.false;
// 	});
//
// 	it('Should use given sCU over predefined sCU when possible', () => {
// 		const Foobar = observer(class extends Component {
// 			shouldComponentUpdate() {
// 				return false;
// 			}
//
// 			render() {
// 				return <div>{this.props.number}</div>;
// 			}
// 		});
//
// 		render(<Foobar number={1} />, container);
// 		expect(container.firstChild.innerHTML).to.equal('1');
//
// 		render(<Foobar number={2} />, container);
// 		expect(container.firstChild.innerHTML).to.equal('1');
// 	});
// });