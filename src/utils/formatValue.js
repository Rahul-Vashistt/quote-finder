export default function formatValue(value) {
    return value.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
}
    