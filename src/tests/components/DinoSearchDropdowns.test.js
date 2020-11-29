import React from "react";
import { DinoSearchDropdowns } from "../../components/DinoSearchDropdowns";
import ReactTestRenderer  from 'react-test-renderer';

let wrapper, tree;

beforeEach(() => {
    wrapper = ReactTestRenderer.create(
        <DinoSearchDropdowns />)
        .toJSON()
});

test("should render dino search dropdowns correctly", () => {
    expect(wrapper).toMatchSnapshot();
});