export function generateLogoURL(imgUrl: string, relativePath: string): string {
	imgUrl = relativePath + imgUrl.replace(/^@\//, "");
	return new URL(imgUrl, import.meta.url).href;
}
