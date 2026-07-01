import type { Job } from "./jobs";
interface Company {
    id: number;
    name: string;
    phone: string;
    email: string;
    jobs: Job[];
    location:string;
}
export type {Company};