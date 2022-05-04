export declare type User = {
    id: string;
    email: string;
    role: Role['name'];
    accessTags?: Record<string, string | number>;
};
export declare type Role = {
    name: string;
    accessTags?: Record<string, string | number>;
};
