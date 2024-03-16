const Input = ({refInput, val, onInput, label, type}) => {
    return (
    <label>
        {label}
        <input ref={refInput} value={val} onInput={onInput} type={type}></input>
    </label>
    )
}

export default Input