export type Platform = "windows" | "mac" | "linux" | "unix" | "unknown";

function parsePlatform(platform: string): Exclude<Platform, "unknown"> | undefined {
	if (/windows|win32|win64/i.test(platform))
		return "windows";

	if (/mac|darwin/i.test(platform))
		return "mac";

	if (/linux|gnu/i.test(platform))
		return "linux";

	if (/bsd|solaris|aix|hp-?ux/i.test(platform))
		return "unix";

	return undefined;
}

function userAgentDataPlatform(): Exclude<Platform, "unknown"> | undefined {
	if (!("userAgentData" in navigator))
		return undefined;

	const {userAgentData} = navigator;
	if (!userAgentData || typeof userAgentData !== "object")
		return undefined;

	if (!("platform" in userAgentData))
		return undefined;

	const {platform} = userAgentData;
	if (!platform || typeof platform !== "string")
		return undefined;

	return parsePlatform(platform);
}

function navigatorPlatform(): Exclude<Platform, "unknown"> | undefined {
	if ("platform" in navigator && navigator.platform)
		return parsePlatform(navigator.platform);
	return undefined;
}

const userAgentPlatform = () => parsePlatform(navigator.userAgent);

export const platform: Platform =
	userAgentDataPlatform() ??
	navigatorPlatform() ??
	userAgentPlatform() ??
	"unknown";