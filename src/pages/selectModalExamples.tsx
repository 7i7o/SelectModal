import React from "react";
import SelectWithModal from "./SelectWithModal";
import Image from "next/image";
import styles from "./index.module.css";

interface CustomOptionProps {
  option: { value: string; text: string; icons: string[] };
  onSelect: () => void;
}

const CustomOption: React.FC<CustomOptionProps> = ({ option, onSelect }) => (
  <div onClick={onSelect}>
    <strong>{option.text}</strong>
    {option.icons?.map((i) => (
      <Image src={i} alt="icon" width={15} height={15} />
    ))}
  </div>
);

const defaultOptions = [
  { value: "option1", text: " Option 1 ", icon: "/option1.png" },
  { value: "option2", text: " Option 2 ", icon: "/option2.png" },
  { value: "option3", text: " Option 3 ", icon: "/option3.png" },
];

const customOptions = defaultOptions.map((o, index) => {
  return { ...o, icons: index < 1 ? [o.icon, o.icon, o.icon] : [] };
});

const App: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          - <span className={styles.pinkSpan}>Examples</span> -
        </h1>
        <SelectWithModal options={defaultOptions} />
        <SelectWithModal
          options={customOptions}
          OptionComponent={CustomOption}
        />
      </div>
    </main>
  );
};

export default App;
