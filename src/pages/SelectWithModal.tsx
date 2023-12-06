import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";

interface Option {
  value: string;
  text: string;
  icon?: string;
}

interface DefaultOptionProps {
  option: Option;
  onSelect: () => void;
}

const DefaultOption: React.FC<DefaultOptionProps> = ({ option, onSelect }) => (
  <div onClick={onSelect}>
    {option.icon && (
      <Image src={option.icon} alt="icon" width={15} height={15} />
    )}
    {option.text}
  </div>
);

interface SelectWithModalProps<T extends Option> {
  options: T[];
  OptionComponent?: React.FC<{ option: T; onSelect: () => void }>;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const ModalContainer = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  position: relative;
`;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 14px;
  color: #333;
`;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  width: 95%;
`;

const SelectWithModal = <T extends Option>({
  options,
  OptionComponent = DefaultOption as React.FC<{
    option: T;
    onSelect: () => void;
  }>,
}: SelectWithModalProps<T>) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<T | null>(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleOptionClick = (option: T) => {
    setSelectedOption(option);
    closeModal();
  };

  const filteredOptions = options.filter((option) =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <button onClick={openModal}>
        {selectedOption ? (
          <OptionComponent
            option={selectedOption}
            onSelect={() => setSelectedOption(null)}
          />
        ) : (
          "Select an option"
        )}
      </button>

      {modalIsOpen && (
        <ModalOverlay>
          <ModalContainer>
            <CloseButton onClick={closeModal}>X</CloseButton>

            <Input
              type="text"
              placeholder="Search options"
              value={searchTerm}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {filteredOptions.map((option) => (
              <OptionComponent
                key={option.value}
                option={option}
                onSelect={() => handleOptionClick(option)}
              />
            ))}
          </ModalContainer>
        </ModalOverlay>
      )}
    </div>
  );
};

export default SelectWithModal;
