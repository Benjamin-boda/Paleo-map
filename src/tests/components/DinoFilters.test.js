import React from "react";
import { DinoFilter } from "../../components/DinoFilter";
import ReactTestRenderer from 'react-test-renderer';

let wrapper;

beforeEach(() => {
    wrapper = ReactTestRenderer.create(
        <DinoFilter/>)
        .toJSON()
});

test("should render dino filters correctly", () => {
    expect(wrapper).toMatchSnapshot();
});