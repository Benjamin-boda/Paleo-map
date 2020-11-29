import React from "react";
import { HomeMap } from "../../components/HomeMap";
import TestRenderer  from 'react-test-renderer';

let wrapper, tree, instance, select1, select2, select3;

beforeEach(() => {
    wrapper = TestRenderer.create(
        <HomeMap />)
        .toJSON()
});

test("should render homemap correctly", () => {
    expect(wrapper).toMatchSnapshot();
});