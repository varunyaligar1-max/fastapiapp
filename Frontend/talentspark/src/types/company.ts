import type { Job } from "./job";
interface Company {
    id: number;
    name: string;
    phone: string;
    email: string;
    jobs: Job[];
    location:string;
}
export type {Company};