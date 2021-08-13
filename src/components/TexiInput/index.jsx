import "./styles.css";

export const TextInput = ({ searchValue, onChange }) => {
    return (
        <input
            type="search"
            className="text-input"
            onChange={onChange}
            value={searchValue}
            placeholder="Type your search"
        />
    );
};
