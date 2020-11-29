import React from "react";
import { DinoSearch } from "../../components/DinoSearch";
import ReactTestRenderer, {ShallowRenderer}   from 'react-test-renderer';
import {shallow, mount} from "enzyme"

let wrapper, tree, input;

beforeEach(() => {
    wrapper = ReactTestRenderer.create(
        <DinoSearch />)
        .toJSON()
    tree = shallow(<DinoSearch />)
    input = tree.find('.header__input')
});

test("should render dino orders filters correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test('It is initially empty', () => {
    expect(input.props().value).toBe('');
});

describe('it could be populated with a value', () => {
    const searchValue = "rex"
    beforeEach(() => {
        input.simulate('change', {
        target: { className: 'header__input' ,value: searchValue }
        });
    });

    test("the input value changes to rex", () => {
        const inputValue = tree.find(".header__input")
        expect(inputValue.props().value).toBe(searchValue);
    });
})