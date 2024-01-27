export function generateLogoURL(imgUrl: string, relativePath: string): string {
	imgUrl = relativePath + imgUrl.replace(/^@\//, "");
	return new URL(imgUrl, import.meta.url).href;
}

export function separateTags(tags: string = ""): string[] {
	return tags.replace(/ /g, "").split(",");
}

export function formatDate(dateString: string | undefined): string | undefined {
	if (!dateString) return;

	const currDate = new Date();
	const inputDate = new Date(dateString);

	const diff = currDate.getTime() - inputDate.getTime();
	const secondsDiff = diff / 1000;

	if (secondsDiff < 60) {
		const secs = Math.floor(secondsDiff);
		return secs > 2 ? `${secs} seconds ago` : "Just now";
	} else if (secondsDiff < 60 ** 2) {
		const mins = Math.floor(secondsDiff / 60);
		return `${mins} ${mins === 1 ? "minute" : "minutes"} ago`;
	} else if (secondsDiff < 24 * 60 ** 2) {
		const hrs = Math.floor(secondsDiff / 60 ** 2);
		return `${hrs} ${hrs === 1 ? "hour" : "hours"} ago`;
	}

	const days = Math.floor(secondsDiff / (24 * 60 ** 2));

	return `${days} ${days === 1 ? "day" : "days"} ago`;
}
