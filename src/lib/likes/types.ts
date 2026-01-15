export type LikeTargetType = "post" | "note";

export interface LikeRequest {
	visitorId: string;
	targetType: LikeTargetType;
	slug: string;
}

export interface LikeStatus {
	count: number;
	liked: boolean;
}

export interface LikesBackend {
	getStatus: (request: LikeRequest) => LikeStatus;
	like: (request: LikeRequest) => LikeStatus;
	unlike: (request: LikeRequest) => LikeStatus;
}
