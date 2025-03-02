export interface StudyAbroad {
    id: number;
    status: number;
    category_id: number;
    title: string;
    content: string;
    post_type: string;
    image_id: number;
    created_at: string;
    updated_at: string;
    image?: {
        id: number;
        drive_id: string;
        parent_id: number;
        file_name: string;
        file_type: string;
        created_at: string;
        updated_at: string;
    };
}

export interface StudyAbroadResponse {
    data: StudyAbroad[];
    meta: {
        error: boolean;
        message?: string | null;
    };
    status_code: number;
}
