import checkmarkIcon from "../images/checkmark.svg"



export default function CheckMarkButton() {
    return (
    <button className="check-icon" aria-label="checked">
        <img src={checkmarkIcon} />
    </button>
    )
}