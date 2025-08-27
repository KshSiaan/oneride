import { base_server } from "../config";

export function dateExtractor(x: string): string {
    if (!x) return "N/A"; // handle empty/null input
    const date = new Date(x);
    if (isNaN(date.getTime())) return "N/A"; // invalid date
    return date.toISOString().split("T")[0];
}

export function timeExtractor(x: string): string {
    if (!x) return "N/A"; // handle empty/null input
    const date = new Date(x);
    if (isNaN(date.getTime())) return "N/A"; // invalid date

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // handle midnight (0 => 12)

    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
}

export function imgCreator(x:string):string{
    if (x.includes("http")) {
        return x
    }
    console.log(`${base_server}/${x}`);
    
    return `${base_server}/${x}`
}