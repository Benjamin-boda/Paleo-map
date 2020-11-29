import React, {useState} from "react";
import {InputGroup, FormControl, Dropdown} from "react-bootstrap";
import {DinoSearchDropdowns} from "./DinoSearchDropdowns";

export const DinoSearch = ({dinosauria, loaded, setIdModal, setModalIsOpen}) => {
    const [keyword, setKeyword] = useState("")
    const [openDropdown, setOpenDropdown] = useState(false)

    const onKeywordChange = (e) => {
        const keywordLower = e.target.value
        setKeyword(keywordLower.toLowerCase())
        setOpenDropdown(true)
    }

    return (
        <div className="header">
            <div className="header__content">

                <img className="header__logo" src={require("../images/logo.png").default}/>

                <h1 className="header__text">PALEO MAP</h1>

                <InputGroup 
                    size="lg"
                    className="header__input" 
                    onChange={onKeywordChange}
                    type="text"
                    placeholder="Search a specimen..."
                    value={keyword}
                >
                        <InputGroup.Prepend>
                            <InputGroup.Text className="InputGroup__Text" id="inputGroup-sizing-lg">Search a specimen</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        />

                        <Dropdown className="dropdown">
                            {openDropdown && loaded ? 
                                <ul className="header__dropdown__content">
                                    <DinoSearchDropdowns 
                                        
                                        dinosauria={dinosauria} 
                                        setOpenDropdown={setOpenDropdown} 
                                        keyword={keyword}
                                        setIdModal={setIdModal} 
                                        setModalIsOpen={setModalIsOpen}
                                    />
                                </ul> : undefined}
                        </Dropdown>
                </InputGroup>

            </div>
        </div>
    ) 
}