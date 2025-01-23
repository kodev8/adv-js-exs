type ProjectBg = "red" | "blue" | "green" | "yellow" | "purple" | "orange"| "black" | "gray";

type Project = {
    id: string;
    title: string;
    description?: string;
    userId: string;
    bg: ProjectBg
};

export default Project;
