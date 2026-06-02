export type Database = {
    public: {
        Tables: {
            people: {
                Row: {
                    id: string;
                    business_id: string;
                    name: string;
                    first_name: string | null;
                    last_name: string | null;
                    specialty: string | null;
                    description: string | null;
                    age: number | null;
                    date_of_birth: string | null;
                    gender: string | null;
                    height: string | null;
                    eye_color: string | null;
                    hair_color: string | null;
                    languages: string[];
                    skills: string[];
                    projects: string[];
                    photo_url: string | null;
                    active: boolean | null;
                    display_order: number | null;
                    created_at: string;
                };
                Insert: Record<string, unknown>;
                Update: Record<string, unknown>;
            };
            projects: {
                Row: {
                    id: string;
                    business_id: string;
                    title: string;
                    type: string | null;
                    year: number | null;
                    photo_url: string | null;
                    description: string | null;
                    active: boolean | null;
                    display_order: number | null;
                    created_at: string;
                };
                Insert: Record<string, unknown>;
                Update: Record<string, unknown>;
            };
            people_projects: {
                Row: {
                    id: string;
                    person_id: string;
                    project_id: string;
                };
                Insert: Record<string, unknown>;
                Update: Record<string, unknown>;
            };
            blog: {
                Row: {
                    id: string;
                    business_id: string;
                    slug: string;
                    title: string;
                    date: string;
                    category: string | null;
                    excerpt: string | null;
                    content: string | null;
                    active: boolean;
                    created_at: string;
                };
                Insert: Record<string, unknown>;
                Update: Record<string, unknown>;
            };
            reviews: {
                Row: {
                    id: string;
                    business_id: string;
                    author_name: string;
                    email: string;
                    rating: number;
                    comment: string;
                    approved: boolean | null;
                    created_at: string;
                };
                Insert: {
                    business_id: string;
                    author_name: string;
                    email: string;
                    rating: number;
                    comment: string;
                };
                Update: Record<string, unknown>;
            };
            quotes: {
                Row: {
                    id: string;
                    business_id: string;
                    customer_name: string;
                    customer_email: string | null;
                    customer_phone: string | null;
                    message: string;
                    status: string;
                    created_at: string;
                };
                Insert: {
                    business_id: string;
                    customer_name: string;
                    customer_email?: string | null;
                    customer_phone?: string | null;
                    message: string;
                    status: string;
                };
                Update: Record<string, unknown>;
            };
        };
    };
};
