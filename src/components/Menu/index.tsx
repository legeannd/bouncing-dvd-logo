import { ChangeEvent, useContext, useEffect, useState } from "react";
import { MenuIcon } from "../../assets/menu-icon";
import { OptionsContext } from "../../contexts/OptionsContext";
import {
  MenuContainer,
  OptionButton,
  OptionsContainer,
  UploadImageButtonContainer,
} from "./styles";

export function Menu() {
  const {
    options,
    handlePause,
    handleToggleTrace,
    handleChangeDirection,
    handleChangeImageFile,
    handleToggleCustomImage,
    handleToggleRandomBackground,
    handleChangeHorizontalDirection,
  } = useContext(OptionsContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].type.startsWith("image")) {
      handleChangeImageFile(e.target.files[0]);
    } else {
      window.alert("Only works with images!");
    }
  };

  return (
    <>
      <MenuContainer
        className="menu-container"
        isOpen={isOpen}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <MenuIcon />
      </MenuContainer>
      <OptionsContainer isOpen={isOpen}>
        <OptionButton onClick={handleToggleTrace}>
          {options.trace ? "Deactivate trace" : "Activate trace"}
        </OptionButton>
        <OptionButton onClick={handlePause}>
          {options.paused ? "Start" : "Stop"}
        </OptionButton>
        <OptionButton onClick={() => handleChangeDirection("toggle")}>
          Change vertical direction
        </OptionButton>
        <OptionButton onClick={() => handleChangeHorizontalDirection("toggle")}>
          Change horizontal direction
        </OptionButton>
        <OptionButton onClick={handleToggleRandomBackground}>
          {options.randomBackground
            ? "Deactivate random background color"
            : "Activate random background color"}
        </OptionButton>
        <OptionButton onClick={handleToggleCustomImage}>
          {options.customImage
            ? "Deactivate custom image for logo"
            : "Activate custom image for logo"}
        </OptionButton>
        {options.customImage && (
          <UploadImageButtonContainer>
            <label htmlFor="myfile">Select custom image for logo</label>
            <input
              type="file"
              id="myfile"
              name="myfile"
              accept="image/*"
              onChange={handleFileChange}
            />
          </UploadImageButtonContainer>
        )}
      </OptionsContainer>
    </>
  );
}
